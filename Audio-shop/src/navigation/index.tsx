import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { HomeScreen } from "../screens/home";
import { HeadphonesScreen } from "../screens/headphones";
import { ProductDetailsScreen } from "../screens/product-details";
import { EarphonesScreen } from "../screens/earphones";
import { SpeakersScreen } from "../screens/speakers";
import { CartScreen } from "../screens/cart";
import { CheckoutScreen } from "../screens/checkout";
import { colors } from "../theme";
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons"

const THEME = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: "white"
    }
};

const HomeStack = createNativeStackNavigator();
const HomeStackScreens = () => {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name="Home" component={HomeScreen} />
            <EarphonesStack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        </HomeStack.Navigator>
    )
};

const HeadphonesStack = createNativeStackNavigator();
const HeadphonesStackScreens = () => {
    return (
        <HeadphonesStack.Navigator screenOptions={{ headerShown: false }}>
            <HeadphonesStack.Screen name="Headphones" component={HeadphonesScreen} />
            <HeadphonesStack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        </HeadphonesStack.Navigator>
    )
};

const EarphonesStack = createNativeStackNavigator();
const EarphonesStackScreens = () => {
    return (
        <EarphonesStack.Navigator screenOptions={{ headerShown: false }}>
            <EarphonesStack.Screen name="Earphones" component={EarphonesScreen} />
            <EarphonesStack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        </EarphonesStack.Navigator>
    )
};

const SpeakersStack = createNativeStackNavigator();
const SpeakersStackScreens = () => {
    return (
        <SpeakersStack.Navigator screenOptions={{ headerShown: false }}>
            <SpeakersStack.Screen name="Speakers" component={SpeakersScreen} />
            <SpeakersStack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        </SpeakersStack.Navigator>
    )
};

const CartStack = createNativeStackNavigator();
const CartStackScreens = () => {
    return (
        <CartStack.Navigator screenOptions={{ headerShown: false }}>
            <CartStack.Screen name="Cart" component={CartScreen} />
            <CartStack.Screen name="Checkout" component={CheckoutScreen} />
        </CartStack.Navigator>
    )
};

const TabBarIcon = ({ fontFamily, name, color }: { fontFamily: "MaterialCommunityIcons" | "SimpleLineIcons" | "Ionicons", name: any, color: string }) => {
    if (fontFamily === "MaterialCommunityIcons") {
        return <MaterialCommunityIcons name={name} size={24} color={color} />
    }

    else if (fontFamily === "SimpleLineIcons") {
        return <SimpleLineIcons name={name} size={24} color={color} />
    }

    else if (fontFamily === "Ionicons") {
        return <Ionicons name={name} size={24} color={color} />
    }
}

const Tab = createBottomTabNavigator();

export const Navigation = () => {
    return (
        <NavigationContainer theme={THEME}>
            <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.primary }}>
                <Tab.Screen
                    options={{
                        title: "Home",
                        tabBarIcon: ({ color }) => <TabBarIcon fontFamily="MaterialCommunityIcons" name="home" color={color} />
                    }}
                    name="HomeTab"
                    component={HomeStackScreens}
                />

                <Tab.Screen
                    options={{
                        title: "Headphones",
                        tabBarIcon: ({ color }) => <TabBarIcon fontFamily="MaterialCommunityIcons" name="headphones" color={color} />
                    }}
                    name="HeadphonesTab"
                    component={HeadphonesStackScreens}
                />

                <Tab.Screen
                    options={{
                        title: "Earphones",
                        tabBarIcon: ({ color }) => <TabBarIcon fontFamily="SimpleLineIcons" name="earphones-alt" color={color} />
                    }}
                    name="EarphonesTab"
                    component={EarphonesStackScreens}
                />

                <Tab.Screen
                    options={{
                        title: "Speakers",
                        tabBarIcon: ({ color }) => <TabBarIcon fontFamily="MaterialCommunityIcons" name="speaker" color={color} />
                    }}
                    name="SpeakersTab"
                    component={SpeakersStackScreens}
                />

                <Tab.Screen
                    options={{
                        title: "Cart",
                        tabBarIcon: ({ color }) => <TabBarIcon fontFamily="Ionicons" name="cart-outline" color={color} />
                    }}
                    name="CartTab"
                    component={CartStackScreens}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}