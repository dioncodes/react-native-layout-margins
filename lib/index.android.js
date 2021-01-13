export const currentInsets = async () => ({
    left: 20,
    right: 20,
    top: 0,
    bottom: 0
});

export const ContentInsetView = ({
	children,
	horizontal = true,
	left = false,
	right = false,
	style = {},
}) => {
	const insetStyle = {
		paddingLeft: left || horizontal ? 20 : 0,
		paddingRight: right || horizontal ? 20 : 0,
		paddingTop: 0,
		paddingBottom: 0,
	};

	return (
		<View style={[insetStyle, style]}>
			{children}
		</View>
	);
}
