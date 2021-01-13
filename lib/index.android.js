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
		paddingLeft: left || horizontal || isDefault ? 20 : 0,
		paddingRight: right || horizontal || isDefault ? 20 : 0,
		paddingTop: 0,
		paddingBottom: 0,
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
	} = props;

	const isDefault = horizontal === undefined
		&& left === undefined
		&& right === undefined;

	const insetStyle = {
		paddingLeft: left || horizontal || isDefault ? 20 : 0,
		paddingRight: right || horizontal || isDefault ? 20 : 0,
		paddingTop: 0,
		paddingBottom: 0,
	};

	return (
		<FlatList
			style={insetStyle}
			{...props}
		/>
	)
}
