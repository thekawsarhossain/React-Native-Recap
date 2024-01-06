import React from 'react'
import { Text } from '../components/Text/Text'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, ScrollView, Pressable, Image, Alert, StyleSheet } from 'react-native'
import { colors, spacing } from '../theme'
import LottieView from 'lottie-react-native';
import { useSelector, useDispatch } from 'react-redux'
import CounterButton from '../components/CounterButton'
import { selectCart, selectTotalAmount } from '../redux/cart/selectors'
import { addToCart, removeFromCart, reset } from '../redux/cart/cartSlice'
import { Button } from '../components/Button'
import { NavigationProps } from '../Types/NavigationTypes'

export const CartScreen: React.FC<NavigationProps<'Cart'>> = ({ navigation }) => {

    const cart = useSelector(selectCart)
    const totalAmount = useSelector(selectTotalAmount)
    const dispatch = useDispatch()

    // Empty cart
    if (cart.length === 0) {
        return (
            <View style={styles.emptyCartContainer}>
                <LottieView
                    autoPlay
                    style={styles.lottieView}
                    loop={false}
                    source={require('../../assets/images/empty-cart.json')}
                />
                <Button
                    title="Explore Products"
                    style={{ width: '80%', alignSelf: "center" }}
                    onPress={() => { navigation.navigate('Home') }}
                />
            </View>
        )
    }

    const onAmountChange = (value: number, cartItem: { id: any; price: number }) => {
        if (value === 0) {
            return Alert.alert(
                'Remove item?',
                'Do you want to remove the item from your cart?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => { },
                        style: 'cancel'
                    },
                    {
                        text: 'Confirm',
                        onPress: () => {
                            dispatch(removeFromCart({ id: cartItem.id }))
                        },
                    }
                ]
            )
        }
        const cartProduct = {
            ...cartItem,
            quantityPrice: value * cartItem.price,
            amount: value
        }
        dispatch(addToCart({ cartProduct }))
    }

    const handleReset = () => {
        return Alert.alert(
            'Empty Cart?',
            'Are you sure you want to empty your cart? All items will be removed.',
            [
                {
                    text: 'Cancel',
                    onPress: () => { },
                    style: 'cancel'
                },
                {
                    text: 'Confirm',
                    onPress: () => {
                        dispatch(reset())
                    },
                }
            ]
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1, margin: spacing[5] }}>
                    <View style={styles.cartHeader}>
                        <Text preset='h6'>
                            {`Cart (${cart.length})`}
                        </Text>
                        <Pressable
                            onPress={handleReset}
                        >
                            <Text
                                textColor="#757575"
                                centered
                                style={{ textDecorationLine: 'underline', fontWeight: 'bold' }}
                            >
                                Remove all
                            </Text>
                        </Pressable>
                    </View>

                    <View style={{ marginVertical: spacing[5] }}>
                        {
                            cart.map((item, index) => {
                                const { id, featured_image, name, quantityPrice, amount } = item
                                return (
                                    <View key={`cart__${id}__${index}`} style={styles.cartItemContainer}>
                                        <View style={styles.cartItemImageContainer} >
                                            <Image
                                                source={{ uri: featured_image }}
                                                style={{ height: 36, width: 36 }}
                                                resizeMode="contain"
                                            />
                                        </View>

                                        <View style={{ flex: 1, marginLeft: spacing[5] }}>
                                            <Text preset="h6">{name}</Text>
                                            <Text>
                                                {`$${quantityPrice}`}
                                            </Text>
                                        </View>

                                        <CounterButton
                                            amount={amount}
                                            setAmount={(value) => onAmountChange(value as number, item)}
                                        />
                                    </View>
                                )
                            })
                        }
                        <View style={styles.totalContainer}>
                            <Text preset="h6">
                                Total
                            </Text>
                            <Text preset="h5">
                                {`$${Number(totalAmount).toFixed(2)}`}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.checkout}>
                    <Button
                        title="CHECKOUT"
                        style={{ width: '100%' }}
                        onPress={() => { navigation.navigate('Checkout') }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    emptyCartContainer: {
        flex: 1,
        justifyContent: "center",
        margin: spacing[5]
    },
    lottieView: {
        width: 250,
        height: "auto",
        alignSelf: 'center'
    },
    cartHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cartItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing[2]
    },
    cartItemImageContainer: {
        backgroundColor: colors.grey,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing[5]
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: spacing[5]
    },
    checkout: {
        flex: 1,
        justifyContent: 'flex-end',
        margin: spacing[5]
    }
})