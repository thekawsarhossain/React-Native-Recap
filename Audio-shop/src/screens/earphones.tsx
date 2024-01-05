import React from 'react'
import { Text } from '../components/Text/Text'
import { View, ScrollView, Image } from 'react-native'
import { useSelector } from 'react-redux'
import { selectEarphones } from '../redux/products/selectors'
import { BannerTitle } from '../components/BannerTitle'
import CategoryTitle from '../components/CategoryTitle'
import { colors, spacing } from '../theme'
import { Button } from '../components/Button'
import Footer from '../components/CategoryFooter'
import { SafeAreaView } from 'react-native-safe-area-context'

export const EarphonesScreen = ({ navigation }: { navigation: any }) => {

    const earphones = useSelector(selectEarphones)
    const onPressProduct = (id: number) => {
        navigation.navigate('ProductDetails', { id: id })
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <BannerTitle />
                <CategoryTitle title="earphones" />
                <View style={{ margin: spacing[5] }}>
                    {
                        earphones.map(earphone => {
                            return (
                                <View key={earphone.id} style={{ marginBottom: 60 }}>
                                    <View
                                        style={{
                                            backgroundColor: colors.grey,
                                            borderRadius: 16,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            paddingVertical: spacing[5],
                                        }}
                                    >
                                        <Image style={{ height: 172, width: 180 }} resizeMode='contain' source={{ uri: earphone.featured_image }} />
                                    </View>

                                    <View style={{ marginTop: spacing[5] }}>
                                        <Text preset="h4" centered>
                                            {earphone.name}
                                        </Text>
                                        <Text preset="h4" centered uppercase>
                                            earphones
                                        </Text>
                                        <Text
                                            textColor="#919191"
                                            centered
                                            style={{
                                                marginTop: spacing[5],
                                                marginHorizontal: spacing[7],
                                            }}
                                        >
                                            {earphone.description}
                                        </Text>
                                    </View>

                                    <Button
                                        style={{ alignSelf: 'center', marginTop: spacing[5] }}
                                        title="SEE PRODUCT"
                                        onPress={() => onPressProduct(earphone.id)}
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
