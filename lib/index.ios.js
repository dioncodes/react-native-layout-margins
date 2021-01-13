import React, { useLayoutEffect, useState } from 'react';
import { Dimensions, NativeModules, View } from 'react-native';

const RNLayoutMargins = NativeModules.RNLayoutMargins;

export const currentInsets = async () => RNLayoutMargins.currentInsets();

export const ContentInsetView = ({
	children,
	horizontal,
	vertical,
	left,
	right,
	top,
	bottom,
	style,
}) => {
	const isDefault = horizontal === undefined
		&& vertical === undefined
		&& left === undefined
		&& right === undefined
		&& top === undefined
		&& bottom === undefined;

	const [insetStyle, setInsetStyle] = useState({ paddingLeft: 0, paddingRight: 0 });

	useLayoutEffect(() => {
		const setInsets = () => {
			currentInsets().then((insets) => {
				setInsetStyle({
					paddingLeft: left || horizontal || isDefault ? insets.left : 0,
					paddingRight: right || horizontal || isDefault ? insets.right : 0,
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
		<View style={[insetStyle, style || {}]}>
			{children}
		</View>
	);
}
