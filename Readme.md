# React Native

## Notes

- React Native is a Javascript framework for writing real, native mobile apps for both iOS and Anddriod.

- Based on Facebook's React library, instead of targeting browser, it targets mobile platforms. Released in 2015

- We can build Android + iOS + Windows + Web + Desktop apps

### How do we get native app from JavaScript?

So for example if we want to write code for Andriod then we have to use like: `ViewGroup` and then inside this `ImageView`, `TextView` etc

Now for iOS we have to use: `UIView` and then inside `UIImageView`, `UITextView`

Now if we do use `React-Native` here then we are gonna use `View` then `Image` or `Text` etc and these will transform into `ViewGroup` for Andriod and for iOS `UIView`

and this is how we will get native apps

### Core Components

- View
- Text
- Image, ImageBackground
- FlatList
- ScrollView
- Button
- TextInput
- Modal
- Pressable
- StatusBar
- Alert

### Other Components

- SafeAreaView

### Styles

In React native for styles we dont need to specify the px it will auto do that based on mobile screen

### Loading

as default loading component we can use `ActivityIndicator` can also set colors and all


### Error 

To display error message we can display in as usuall way also we can use packages like: [React Native Flash Message](https://www.npmjs.com/package/react-native-flash-message)
