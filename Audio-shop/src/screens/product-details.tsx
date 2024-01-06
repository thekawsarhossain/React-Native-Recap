import React, { useState } from 'react'
import { Text } from '../components/Text/Text'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, ScrollView, Pressable, Image, StyleSheet } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from '../theme';
import { useSelector, useDispatch } from 'react-redux';
import { selectProductById } from "../redux/products/selectors"
import { BannerTitle } from '../components/BannerTitle';
import { NavigationProps } from '../Types/NavigationTypes';
import CounterButton from '../components/CounterButton';
import { Button } from '../components/Button';
import { showMessage } from 'react-native-flash-message';
import { addToCart } from '../redux/cart/cartSlice';

export const ProductDetailsScreen: React.FC<NavigationProps<'ProductDetails'>> = ({ navigation, route }: { navigation: any, route: any }) => {
  const id = route.params.id
  const product = useSelector((state: any) => selectProductById(state, id));

  const { featured_image, name, price, description, category, features, included, images } = product || {};

  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch()

  const add = () => {
    if (amount === 0) {
      return showMessage({
        message: 'Amount must be greater than 0',
        type: 'danger',
      })
    }

    const cartProduct = {
      id,
      name,
      featured_image,
      price,
      quantityPrice: price as number * amount,
      amount: amount
    }

    dispatch(addToCart({ cartProduct }));
    showMessage({
      message: 'Product added to cart',
      type: 'success',
    })
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <BannerTitle />

        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-sharp" size={24} color="black" style={{ margin: spacing[5] }} />
        </Pressable>

        <View style={{ margin: spacing[5] }}>
          <View style={styles.productImageConatiner}>
            <Image style={{ height: 200, width: 300 }} resizeMode='contain' source={{ uri: featured_image }} />
          </View>

          <View style={{ marginVertical: spacing[5] }}>
            <Text preset="h4">{name}</Text>
            <Text uppercase preset="h4">{category}</Text>
            <Text textColor="#7d7d7d" style={{ marginTop: spacing[5] }}>
              {description}
            </Text>
            <Text preset="h6" style={{ marginTop: spacing[4] }}>
              {`$ ${price}`}
            </Text>
          </View>

          <View style={styles.addToCartContainer}>
            <CounterButton setAmount={setAmount} amount={amount} />
            <Button title='Add to cart' style={{ marginLeft: spacing[4] }} onPress={add} />
          </View>

          <View style={{ marginVertical: spacing[5] }}>
            <Text preset="h4">FEATURES</Text>
            <Text textColor="#7d7d7d" style={{ paddingTop: spacing[3], lineHeight: 25 }}>{features}</Text>
          </View>

          {included && <View style={{ marginVertical: spacing[5] }}>
            <Text preset="h4">IN THE BOX</Text>
            {included?.map(item =>
              <View key={`product_details_${item.name}__${id}`} style={styles.productDetailsContainer}>
                <Text preset="h6" textColor={colors.primary}>{item.amount}x</Text>
                <Text textColor="#7d7d7d" style={{ marginLeft: spacing[3] }}>{item.name}</Text>
              </View>
            )}
          </View>}

          <View style={{ marginVertical: spacing[8] }}>
            {images?.map((image, index) => {
              return (
                <View key={`image__${image.id}__${index}`} style={{ marginVertical: spacing[3], overflow: 'hidden' }}>
                  <Image source={{ uri: image.image_url }} style={{ alignSelf: 'center', height: 200, width: "100%", borderRadius: 12 }} resizeMode='cover' />
                </View>
              )
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  productImageConatiner: {
    backgroundColor: colors.grey,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing[8]
  },
  productDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing[3]
  },
  addToCartContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: spacing[6]
  }
})
