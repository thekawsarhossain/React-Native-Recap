import React from 'react'
import { Text } from '../components/Text/Text'
import { View, ScrollView, Image } from 'react-native'
import { useSelector } from 'react-redux'
import { selectHeadphones } from '../redux/products/selectors'
import Footer from '../components/CategoryFooter'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BannerTitle } from '../components/BannerTitle'
import CategoryTitle from '../components/CategoryTitle'
import { colors, spacing } from '../theme'
import { Button } from '../components/Button'


export const HeadphonesScreen = ({ navigation }: { navigation: any }) => {

    const headphones = useSelector(selectHeadphones)
    const onPressProduct = (id: number) => {
        navigation.navigate('ProductDetails', { id: id })
    }

    console.log("headphones -------> ", headphones)

    return (
        <SafeAreaView>
            <ScrollView>
                <BannerTitle />
                <CategoryTitle title="headphones" />
                <View style={{ margin: spacing[5] }}>
                    {
                        headphones.map(headphone => {
                            return (
                                <View key={headphone.id} style={{ marginBottom: 60 }}>
                                    <View
                                        style={{
                                            backgroundColor: colors.grey,
                                            borderRadius: 16,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            paddingVertical: spacing[5],
                                        }}
                                    >
                                        <Image style={{ height: 172, width: 180 }} resizeMode='contain' source={{ uri: headphone.featured_image }} />
                                    </View>

                                    <View style={{ marginTop: spacing[5] }}>
                                        <Text preset="h4" centered>
                                            {headphone.name}
                                        </Text>
                                        <Text preset="h4" centered uppercase>
                                            headphones
                                        </Text>
                                        <Text
                                            textColor="#919191"
                                            centered
                                            style={{
                                                marginTop: spacing[5],
                                                marginHorizontal: spacing[7],
                                            }}
                                        >
                                            {headphone.description}
                                        </Text>
                                    </View>

                                    <Button
                                        style={{ alignSelf: 'center', marginTop: spacing[5] }}
                                        title="SEE PRODUCT"
                                        onPress={() => onPressProduct(headphone.id)}
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
