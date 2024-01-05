import React from 'react'
import { View, ScrollView, Image } from 'react-native'
import { useSelector } from 'react-redux'
import Footer from '../components/CategoryFooter'
import CategoryTitle from '../components/CategoryTitle'
import { colors, spacing } from '../theme'
import { selectSpeakers } from '../redux/products/selectors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from '../components/Text/Text'
import { BannerTitle } from '../components/BannerTitle'
import { Button } from '../components/Button'


export const SpeakersScreen = ({ navigation }: { navigation: any }) => {
  const speakers = useSelector(selectSpeakers)
  const onPressProduct = (id: number) => {
    navigation.navigate('ProductDetails', { id: id })
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <BannerTitle />
        <CategoryTitle title="speakers" />
        <View style={{ margin: spacing[5] }}>
          {
            speakers.map(speaker => {
              return (
                <View key={speaker.name} style={{ marginBottom: 60 }}>
                  <View
                    style={{
                      backgroundColor: colors.grey,
                      borderRadius: 16,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: spacing[5],
                    }}
                  >
                    <Image source={{ uri: speaker.images[0]?.image_url }} />
                  </View>

                  <View style={{ marginTop: spacing[5] }}>
                    <Text preset="h4" centered>
                      {speaker.name}
                    </Text>
                    <Text preset="h4" centered uppercase>
                      speakers
                    </Text>
                    <Text
                      textColor="#919191"
                      centered
                      style={{
                        marginTop: spacing[5],
                        marginHorizontal: spacing[7],
                      }}
                    >
                      {speaker.description}
                    </Text>
                  </View>

                  <Button
                    style={{ alignSelf: 'center', marginTop: spacing[5] }}
                    title="SEE PRODUCT"
                    onPress={() => onPressProduct(speaker.id)}
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
