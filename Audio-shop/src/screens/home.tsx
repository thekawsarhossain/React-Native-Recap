import React, { useEffect } from 'react'
import { Text } from '../components/Text/Text'
import { fetchProducts } from '../redux/products/productsSlice'
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from '../redux/store';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BannerTitle } from '../components/BannerTitle';
import { colors, spacing } from '../theme';
import { AntDesign } from "@expo/vector-icons"
import { selectFeaturedProducts, selectStatus } from '../redux/products/selectors';
import { Button } from '../components/Button';
import { NavigationProps } from '../Types/NavigationTypes';

export const HomeScreen: React.FC<NavigationProps<'Home'>> = ({ navigation }) => {
    const { width: windowWidth } = useWindowDimensions();
    const dispatch = useDispatch<AppDispatch>();
    const status = useSelector(selectStatus);
    const featuredProducts = useSelector(selectFeaturedProducts);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProducts());
        }
    }, []);


    if (status === "idle") {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator />
            </View>
        )
    }

    return (
        <SafeAreaView>
            <ScrollView>
                {/* Banner */}
                <BannerTitle />
                <View style={{ backgroundColor: colors.black }}>
                    <Image style={{ width: "100%", alignSelf: "center" }} source={require("../../assets/images/home-banner.png")} resizeMode='cover' />

                    <View style={styles.bannerContentContainer}>
                        <Text preset="h2" centered white uppercase>
                            Welcome
                        </Text>
                        <Text textColor={colors.grey} centered style={[styles.bannerDescription, { width: windowWidth - 20 }]}>
                            Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast
                        </Text>
                    </View>
                </View>


                {/* categories */}
                <View style={{ paddingVertical: spacing[8], }}>
                    <CategoryBox
                        title='Headphones'
                        image={require("../../assets/images/home-headphone.png")}
                        onPress={() => navigation.navigate("HeadphonesTab")}
                    />

                    <CategoryBox
                        title='Earphones'
                        image={require("../../assets/images/home-earphone.png")}
                        onPress={() => navigation.navigate("EarphonesTab")}
                    />

                    <CategoryBox
                        title='Speakers'
                        image={require("../../assets/images/home-speaker.png")}
                        onPress={() => navigation.navigate("SpeakersTab")}
                    />
                </View>

                {/* Featured */}
                <View style={{ paddingVertical: spacing[8], paddingHorizontal: spacing[4] }}>
                    {
                        featuredProducts.map((product, index) => <FeaturedProductBox
                            key={`featured__${product.id}__${index}`}
                            name={product.name}
                            category={product.category}
                            image={product.featured_image}
                            onPress={() => navigation.navigate('ProductDetails', { id: product.id })}
                        />)
                    }
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const CategoryBox = ({ title, image, onPress }: { title: string, image: string, onPress: () => void }) => {
    return (
        <Pressable onPress={onPress} style={styles.categoryBox}>
            <Image source={image as any} style={{ top: -60 }} />
            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text preset="h6" uppercase>
                    {title}
                </Text>
            </View>
            <View style={styles.categoryShopBtn}>
                <Text preset="subtitle" textColor="#7c7c7c" uppercase>Shop</Text>
                <AntDesign name='right' color={colors.primary} size={14} />
            </View>
        </Pressable>
    )
}

const FeaturedProductBox = ({ name, category, image, onPress }: { name: string, category: string, image: string, onPress: () => void }) => {
    const { width: windowWidth } = useWindowDimensions();

    return (
        <View style={styles.featuredProductBox}>
            <View style={[styles.featuredProductCircle, { width: windowWidth - 40 }]}>
                <View style={[styles.featuredProductCircle, { width: windowWidth - 80, height: 280 }]}>
                    <Image style={{ height: 172, width: 180 }} resizeMode='contain' source={{ uri: image }} />
                </View>
            </View>
            <View style={{ paddingBottom: spacing[8], marginTop: -spacing[6] }}>
                <Text preset="h3" centered uppercase white>{name}</Text>
                <Text preset="h3" centered uppercase white>{category}</Text>
                <Text centered white style={{ width: 250, marginTop: spacing[4] }}>Upgrade to premium devices that are phenomenally built to deliver truly remarkable sound</Text>

                <Button title='See Product' style={{ backgroundColor: colors.black, alignSelf: "center", marginTop: spacing[5] }} onPress={onPress} />

            </View>
        </View>
    )

}


const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    bannerContentContainer: {
        position: "absolute",
        width: "100%",
        top: 200
    },
    bannerDescription: {
        width: 300,
        alignSelf: "center",
        fontWeight: "300",
        marginTop: spacing[4]
    },
    categoryBox: {
        marginVertical: spacing[8],
        marginHorizontal: spacing[5],
        borderRadius: spacing[4],
        backgroundColor: colors.grey,
        alignItems: "center",
        padding: spacing[5]
    },
    categoryShopBtn: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: spacing[4]
    },
    featuredProductBox: {
        marginVertical: spacing[5],
        backgroundColor: colors.primary,
        borderRadius: spacing[4],
        alignItems: "center",
        justifyContent: "center"
    },
    featuredProductCircle: {
        borderWidth: 1,
        borderColor: "#d8d8d8",
        borderRadius: 400,
        height: 320,
        justifyContent: "center",
        alignItems: "center"
    }
});