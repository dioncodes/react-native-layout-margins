export const currentInsets = async () => ({
    left: 20,
    right: 20,
    top: 0,
    bottom: 0
});

export const ContentInsetView = ({
	children,
	horizontal,
	left,
	right,
	style,
}) => {
	const isDefault = horizontal === undefined
		&& left === undefined
		&& right === undefined;

	const insetStyle = {
		paddingLeft: left || horizontal || isDefault ? 20 : undefined,
		paddingRight: right || horizontal || isDefault ? 20 : undefined,
		paddingTop: undefined,
		paddingBottom: undefined,
	};

	return (
		<View style={[insetStyle, style]}>
			{children}
		</View>
	);
}

export const ContentInsetFlatList = (props) => {
	const {
		horizontal,
		left,
		right,
		contentContainerStyle,
		initialScrollTo
	} = props;

	const flatListRef = useRef(null);

	const isDefault = horizontal === undefined
		&& left === undefined
		&& right === undefined;

	const insetStyle = {
		paddingLeft: left || horizontal || isDefault ? 20 : undefined,
		paddingRight: right || horizontal || isDefault ? 20 : undefined,
		paddingTop: undefined,
		paddingBottom: undefined,
	};

	useEffect(() => {
		if (initialScrollTo) {
			setTimeout(() => {
				if (flatListRef) {
					flatListRef.current.scrollToIndex({
						index: initialScrollTo.index,
						animated: initialScrollTo.animated || true,
						viewOffset: initialScrollTo.offset || 0,
					});
				}
			}, initialScrollTo.delay || 500);
		}
	}, []);

	return (
		<FlatList
			ref={flatListRef}
			{...props}
			contentContainerStyle={[insetStyle, contentContainerStyle]}
		/>
	);
}

export const LayoutMarginProviderContext = React.createContext(undefined);

export const LayoutMarginProvider = ({ children }) => {
	const contextInstance = {
		currentInsets: { left: 0, right: 0, top: 0, bottom: 0 },
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
