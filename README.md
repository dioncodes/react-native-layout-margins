# react-native-layout-margins

A simple react native module for views that consider the iOS [layoutMargins](https://developer.apple.com/documentation/uikit/uiview/1622651-layoutmarginsguide) (including safe area insets).
Supports two components for easy usage (`<ContentInsetView />` and `<ContentInsetFlatList />`) and a method for querying the margins of the current root view.

Please read the [iOS Layout Design Guides](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/adaptivity-and-layout/) for more details on the layout margins.

Based on [delightfulstudio/react-native-safe-area-insets](https://github.com/DelightfulStudio/react-native-safe-area-insets).

# Installation

```sh
yarn add @dioncodes/react-native-layout-margins
cd ios && pod install
```

*Important:* If you are updating from version 1.2 or earlier and using the components, you will need to add the `LayoutMarginProvider` (see Component Usage below).

# Manual linking
1. Open your project in XCode
1. Add `./node_modules/@dioncodes/react-native-layout-margins/ios/RNLayoutMargins.xcodeproj` to `Libraries` in your project
1. Select root of your project
1. Switch to `General` tab
1. Scroll down to `Linked Frameworks and Libraries` section
1. Click button `+`
1. Add `libRNLayoutMargins.a` (if it's not present, build the project and try again)

## Component Usage

To use the components you need to wrap your screens into a `<LayoutMarginProvider>`.

```javascript
import { LayoutMarginProvider } from '@dioncodes/react-native-layout-margins';
...

const App = () => (
	<LayoutMarginProvider>
		...
	</LayoutMarginProvider>
);
```

```javascript
import { ContentInsetView } from '@dioncodes/react-native-layout-margins';
...
<ContentInsetView>
	<Text>I'm aligned according to the iOS layout margins!</Text>
</ContentInsetView>
```

```jsx
<ContentInsetView vertical horizontal>
	<Text>I'm aligned according to the iOS layout margins (including safe area), vertically and horizontally.</Text>
</ContentInsetView>
```

```jsx
<ContentInsetView vertical>
	<Text>I'm vertically (but not horizontally) aligned according to the iOS layout margins (including safe area).</Text>
</ContentInsetView>
```

Also supporting a (react-native-gesture-handler) FlatList with content insets:

```jsx
<ContentInsetFlatList
	data={...}
	renderItem={...}
	keyExtractor={(item) => item.id}
	vertical
	horizontal
/>
```

*Props*:

* `horizontal` (boolean, optional)
* `vertical` (boolean, optional)
* `top` (boolean, optional)
* `left` (boolean, optional)
* `right` (boolean, optional)
* `bottom` (boolean, optional)
* `style` (optional [`ViewStyle`](https://reactnative.dev/docs/view-style-props) prop that is passed to the `View` container)

ContentInsetFlatList also accepts all FlatList props.

If no property is set, only the horizontal padding is active.

## Manual Usage With provider

```javascript
import React from 'react';
import { View } from 'react-native';

import { useGetLayoutMarginProvider } from '@dioncodes/react-native-layout-margins';

export default function ExampleScreen() {
	const layoutMarginContext = useGetLayoutMarginProvider();
	const insets = layoutMarginContext.currentInsets;

	const insetStyle = {
		paddingLeft: insets.left,
		paddingRight: insets.right,
	};

	return (
		<View style={insetStyle}>
			<Text>I'm aligned according to the iOS layout margins!</Text>
		</View>
	);
}
```


## Manual Usage Without Provider

```javascript
import React, { useLayoutEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';

import { currentInsets } from '@dioncodes/react-native-layout-margins';

export default function ExampleScreen() {
	const [insetStyle, setInsetStyle] = useState({ paddingLeft: 0, paddingRight: 0 });

	useLayoutEffect(() => {
		const setInsets = () => {
			currentInsets().then((insets) => {
				setInsetStyle({
					paddingLeft: insets.left,
					paddingRight: insets.right,
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
		<View style={insetStyle}>
			<Text>I'm aligned according to the iOS layout margins!</Text>
		</View>
	);
}
```
