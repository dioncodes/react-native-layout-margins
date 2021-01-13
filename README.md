# react-native-layout-margins

A simple react native module that allows to query [layoutMargins](https://developer.apple.com/documentation/uikit/uiview/1622651-layoutmarginsguide) of a current root view according to the [iOS Layout Design Guides](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/adaptivity-and-layout/)

Based on [delightfulstudio/react-native-safe-area-insets](https://github.com/DelightfulStudio/react-native-safe-area-insets).

# Installation

```sh
yarn add @dioncodes/react-native-layout-margins
cd ios && pod install
```

# Manual linking
1. Open your project in XCode
1. Add `./node_modules/@dioncodes/react-native-layout-margins/ios/RNLayoutMargins.xcodeproj` to `Libraries` in your project
1. Select root of your project
1. Switch to `General` tab
1. Scroll down to `Linked Frameworks and Libraries` section
1. Click button `+`
1. Add `libRNLayoutMargins.a` (if it's not present, build the project and try again)

## Component Usage

```javascript
import { ContentInsetView } from '@dioncodes/react-native-layout-margins';
...
<ContentInsetView>
	<Text>I'm aligned according to the iOS layout margins!</Text>
</ContentInsetView>
```

```javascript
<ContentInsetView vertical horizontal>
	<Text>I'm aligned according to the iOS layout margins (including safe area), vertically and horizontally.</Text>
</ContentInsetView>
```

```javascript
<ContentInsetView vertical>
	<Text>I'm vertically (but not horizontally) aligned according to the iOS layout margins (including safe area).</Text>
</ContentInsetView>
```

*Props*:

* `horizontal` (boolean, optional)
* `vertical` (boolean, optional)
* `top` (boolean, optional)
* `left` (boolean, optional)
* `right` (boolean, optional)
* `bottom` (boolean, optional)
* `style` (optional [`ViewStyle`](https://reactnative.dev/docs/view-style-props) prop that is passed to the `View` container)

If no property is set, only the horizontal padding is active.

## Manual Usage

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
