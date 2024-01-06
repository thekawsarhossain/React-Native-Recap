import { useFonts } from 'expo-font';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Provider } from "react-redux"
import { persistor, store } from './src/redux/store';
import { PersistGate } from "redux-persist/integration/react"
import { Navigation } from './src/navigation';
import axios from "axios";

// Axios base url 
axios.defaults.baseURL = "https://audio-shop-app-backend.vercel.app";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Manrope-Regular": require("./assets/fonts/Manrope-Regular.ttf"),
    "Manrope-Medium": require("./assets/fonts/Manrope-Medium.ttf"),
    "Manrope-Bold": require("./assets/fonts/Manrope-Bold.ttf")
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <Navigation />
          <FlashMessage position="top" floating statusBarHeight={50} />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});
