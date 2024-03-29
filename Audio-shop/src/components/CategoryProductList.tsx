import React from 'react'
import { Text } from './Text/Text'
import { View, ScrollView, Image, StyleSheet } from 'react-native'
import { BannerTitle } from './BannerTitle'
import CategoryTitle from './CategoryTitle'
import { colors, spacing } from '../theme'
import { Button } from './Button'
import Footer from './CategoryFooter'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { Product } from '../redux/products/productsInterface'
import { NavigationProp } from '@react-navigation/native';

interface Props {
    title: string;
    products: Product[];
}

export const ProductList = ({ title, products }: Props) => {

    const navigation = useNavigation<NavigationProp<{
        ProductDetails: { id: number };
    }>>();

    const onPressProduct = (id: number) => {
        navigation.navigate('ProductDetails', { id: id })
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <BannerTitle />
                <CategoryTitle title={title} />
                <View style={{ margin: spacing[5] }}>
                    {
                        products.map((product, index) => {
                            return (
                                <View key={`${title}__${product.id}__${index}`} style={{ marginBottom: 60 }}>
                                    <View
                                        style={styles.productImageContainer}
                                    >
                                        <Image style={{ height: 172, width: 180 }} resizeMode='contain' source={{ uri: product.featured_image }} />
                                    </View>

                                    <View style={{ marginTop: spacing[5] }}>
                                        <Text preset="h4" centered>
                                            {product.name}
                                        </Text>
                                        <Text preset="h4" centered uppercase>
                                            {title}
                                        </Text>
                                        <Text
                                            textColor="#919191"
                                            centered
                                            style={{
                                                marginTop: spacing[5],
                                                marginHorizontal: spacing[7],
                                            }}
                                        >
                                            {product.description}
                                        </Text>
                                    </View>

                                    <Button
                                        style={{ alignSelf: 'center', marginTop: spacing[5] }}
                                        title="SEE PRODUCT"
                                        onPress={() => onPressProduct(product.id)}
                                    />
                                </View>
                            )
                        })
                    }
                    <Footer />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    productImageContainer: {
        backgroundColor: colors.grey,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing[5],
    }
})
