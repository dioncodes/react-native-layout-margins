import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Dimensions, NativeModules, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

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

	const layoutMarginContext = useGetLayoutMarginProvider();
	const insets = layoutMarginContext.currentInsets || { left: 0, top: 0, right: 0, bottom: 0 };

	const insetStyle = {
		paddingLeft: left || horizontal || isDefault ? insets.left : undefined,
		paddingRight: right || horizontal || isDefault ? insets.right : undefined,
		paddingTop: top || vertical ? insets.top : undefined,
		paddingBottom: bottom || vertical ? insets.bottom : undefined,
	};

	return (
		<View style={[insetStyle, style || {}]}>
			{children}
		</View>
	);
}

export const ContentInsetFlatList = (props) => {
	const {
		horizontal,
		vertical,
		left,
		right,
		top,
		bottom,
		contentContainerStyle,
		initialScrollTo
	} = props;

	const flatListRef = useRef(null);

	const isDefault = horizontal === undefined
		&& vertical === undefined
		&& left === undefined
		&& right === undefined
		&& top === undefined
		&& bottom === undefined;

	const layoutMarginContext = useGetLayoutMarginProvider();
	const insets = layoutMarginContext.currentInsets || { left: 0, top: 0, right: 0, bottom: 0 };

	const insetStyle = {
		paddingLeft: left || horizontal || isDefault ? insets.left : 0,
		paddingRight: right || horizontal || isDefault ? insets.right : 0,
		paddingTop: top || vertical ? insets.top : 0,
		paddingBottom: bottom || vertical ? insets.bottom : 0,
	};

	useEffect(() => {
		if (initialScrollTo) {
			setTimeout(() => {
				if (flatListRef) {
					flatListRef.current.scrollToIndex({
						animated: initialScrollTo.animated || true,
						index: initialScrollTo.index,
						viewOffset: initialScrollTo.offset,
					});
				}
			}, initialScrollTo.delay || 500);
		}
	}, []);

	return (
		<FlatList
			ref={flatListRef}
			{...props}
			contentContainerStyle={[contentContainerStyle, insetStyle]}
		/>
	)
}

export const LayoutMarginProviderContext = React.createContext(undefined);

export const LayoutMarginProvider = ({ children }) => {
	const [insets, setInsets] = useState({ left: 0, right: 0, top: 0, bottom: 0 });

	const updateInsets = () => {
		currentInsets().then((current) => {
			setInsets({
				left: current.left,
				right: current.right,
				top: current.top,
				bottom: current.bottom,
			});
		});
	};

	useLayoutEffect(() => {
		updateInsets();
		Dimensions.addEventListener('change', updateInsets);

		return function cleanup() {
			Dimensions.removeEventListener('change', updateInsets);
		};
	}, []);

	const contextInstance = {
		currentInsets: insets,
	};

	return (
		<LayoutMarginProviderContext.Provider value={contextInstance}>
			{children}
		</LayoutMarginProviderContext.Provider>
	);
};

export function useGetLayoutMarginProvider() {
	const context = useContext(LayoutMarginProviderContext);

	if (!context) {
		throw new Error('Layout margin context is not set');
	}

	return context;
}
