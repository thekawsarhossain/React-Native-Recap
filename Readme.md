# React Native

## Notes

- React Native is a Javascript framework for writing real, native mobile apps for both iOS and Android.

- Based on Facebook's React library, it targets mobile platforms instead of browsers. Released in 2015

- We can build Android + iOS + Windows + Web + Desktop apps

### How do we get a native app from JavaScript?

So for example if we want to write code for Andriod then we have to use like: `ViewGroup` and then inside this `ImageView`, `TextView` etc

Now for iOS, we have to use: `UIView` and then inside `UIImageView`, `UITextView`

Now if we do use `React-Native` here then we are going to use `View` then `Image` or `Text` etc and these will transform into `ViewGroup` for Andriod and iOS `UIView`

and this is how we will get native apps

### Core Components

- View
- Text
- Image, ImageBackground
- FlatList, SectionList
- ScrollView
- Button
- TextInput, Switch
- Modal
- Pressable
- Alert

### Other Components

- SafeAreaView
- StatusBar
- KeyboardAvoidingView

### Styles

- In React native for styles we don't need to specify the px it will auto-do that based on the mobile screen
- There is no inheritance in React-native style means: Let's say I've one `View` component inside I've `Text` Now if I try to apply the style in the `View` component for example: `backgroundColor: "Black", color: "white"` then the `Text` component will not inherit the color from `View` and will display text in black | Although React Native style inheritance capabilities are limited compared to CSS it still supports styles inheritance within `Text` subtrees
- The best way to add platform-specific styles
- <img width="531" alt="image" src="https://github.com/thekawsarhossain/React-Native-Recap/assets/86672839/5e0e43f1-38ef-4cc6-9458-5b29e9af389b">
- Can also use `Platform.OS` this is better for small sort platforms-specific styles: `paddingTop: Platform.OS === "android" ? 25 : 0`
    

### Platforms-specific codes 

- We can create platforms-specific components by creating the same components using two different names/extensions i.e: `CustomButton.andriod.tsx` and `CustomButton.ios.tsx` now if we call/render this button based on the platform the component will render on screen 

### Loading 

as the default loading component we can use `ActivityIndicator` can also set colors and all


### Error 

To display error messages we can display them in a usual way also we can use packages like: [React Native Flash Message](https://www.npmjs.com/package/react-native-flash-message)
