import React, { Context } from 'react';
import { ViewStyle, FlatListProps } from 'react-native';

declare module '@dioncodes/react-native-layout-margins' {
	type InsetType = {
		left: number,
		right: number,
		bottom: number,
		top: number,
	};

	export function currentInsets(): Promise<InsetType>;

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

	interface ContentInsetFlatListProps<ItemT> extends FlatListProps<ItemT> {
		horizontal?: boolean,
		vertical?: boolean,
		left?: boolean,
		right?: boolean,
		top?: boolean,
		bottom?: boolean,
		style?: ViewStyle,
	}

	type LayoutMarginProviderContextType = {
		currentInsets: InsetType,
	}

	export const ContentInsetFlatList: React.FC<ContentInsetFlatListProps<any>>;
	export const LayoutMarginProviderContext: Context<{}>;
	export const LayoutMarginProvider: React.FC<{}>;
	export const useGetLayoutMarginProvider: () => LayoutMarginProviderContextType;
}
