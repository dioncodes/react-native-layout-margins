import React, { useLayoutEffect, useState } from 'react';
import { Dimensions, NativeModules, View } from 'react-native';

const RNLayoutMargins = NativeModules.RNLayoutMargins;

export const currentInsets = async () => RNLayoutMargins.currentInsets();

export const ContentInsetView = ({
	children,
	horizontal = true,
	vertical = false,
	left = false,
	right = false,
	top = false,
	bottom = false,
	style = {},
}) => {
	const [insetStyle, setInsetStyle] = useState({ paddingLeft: 0, paddingRight: 0 });

	useLayoutEffect(() => {
		const setInsets = () => {
			currentInsets().then((insets) => {
				setInsetStyle({
					paddingLeft: left || horizontal ? insets.left : 0,
					paddingRight: right || horizontal ? insets.right : 0,
					paddingTop: top || vertical ? insets.top : 0,
					paddingBottom: bottom || vertical ? insets.bottom : 0,
				});
			});
		};

		setInsets();
		Dimensions.addEventListener('change', setInsets);

		return function cleanup() {
			Dimensions.removeEventListener('change', setInsets);
		};
	}, []);


	return (
		<View style={[insetStyle, style]}>
			{children}
		</View>
	);
}
