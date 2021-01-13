import React from 'react';
import { ViewStyle } from 'react-native';

declare module '@dioncodes/react-native-layout-margins' {
    export function currentInsets(): Promise<{
        left: number,
        right: number,
        bottom: number,
        top: number,
	}>;

	export const ContentInsetView: React.FC<{
		children: React.ReactNode,
		horizontal?: boolean,
		vertical?: boolean,
		left?: boolean,
		right?: boolean,
		top?: boolean,
		bottom?: boolean,
		style?: ViewStyle,
	}>;
}
