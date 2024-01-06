import React, { useEffect, useState } from 'react'
import { Text } from '../components/Text/Text'
import { View, ScrollView, Image, Pressable, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '../components/Checkbox';
import Input from '../components/Input';
import { reset } from '../redux/cart/cartSlice';
import { colors, spacing } from '../theme';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Ionicons } from "@expo/vector-icons";
import Modal from 'react-native-modal'
import AnimatedLottieView from 'lottie-react-native';
import { selectCart, selectTotalAmount } from '../redux/cart/selectors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProps } from '../Types/NavigationTypes';
import { Button } from '../components/Button';
import { cartItem } from '../redux/cart/cartInterface';

const VAT = 20;
const SHIPPING_PRICE = 50;

const schema = Yup.object().shape({
    name: Yup.string().required("Name field is mandatory.").min(3, "Ensure your name has at least 3 characters."),
    email: Yup.string().required("Email field is mandatory.").email("Ensure you've entered a valid email."),
    phone: Yup.string().required("Phone number is mandatory.").matches(/^[0-9]+$/, "Phone number can only contain digits."),
    address: Yup.string().required("Address field is mandatory."),
    city: Yup.string().required("City field is mandatory."),
    country: Yup.string().required("Country field is mandatory."),
    zip: Yup.string().required("ZIP/Postal code field is mandatory."),
})

export const CheckoutScreen: React.FC<NavigationProps<'Checkout'>> = ({ navigation }) => {

    const dispatch = useDispatch();
    const cartItems: cartItem[] = useSelector(selectCart)
    const totalPrice = useSelector(selectTotalAmount)
    const [isOpenModal, setIsOpenModal] = useState(false);

    const toggleModal = () => setIsOpenModal(!isOpenModal);

    useEffect(() => {
        if (!cartItems.length) navigation.navigate("Cart");
    }, [cartItems])

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            country: '',
            zip: '',
        },
        validationSchema: schema,
        onSubmit: values => {
            if (formik.isValid) {
                toggleModal()
                console.log(values)
            }
        },
    })

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
            <ScrollView>
                <Pressable onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-sharp" size={24} color="black" style={{ margin: spacing[5] }} />
                </Pressable>
                {/* Form */}
                <View style={styles.formContainer}>
                    <Text preset="h6">Checkout</Text>

                    <Text textColor={colors.primary} uppercase style={{ marginTop: spacing[4] }}>Billing details</Text>

                    <Input
                        label="Name"
                        placeholder="John doe"
                        onChangeText={formik.handleChange('name')}
                        onBlur={formik.handleBlur('name')}
                    />

                    {formik.touched.name && formik.errors.name && (
                        <Text preset="small" style={styles.inputErrorMessage}>{formik.errors.name}</Text>
                    )}

                    <Input
                        label="Email address"
                        placeholder="john@gmail.com"
                        onChangeText={formik.handleChange('email')}
                        onBlur={formik.handleBlur('email')}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <Text preset="small" style={styles.inputErrorMessage}>{formik.errors.email}</Text>
                    )}

                    <Input
                        label="Phone number"
                        placeholder="01823998213"
                        onChangeText={formik.handleChange('phone')}
                        onBlur={formik.handleBlur('phone')}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                        <Text preset="small" style={styles.inputErrorMessage}>{formik.errors.phone}</Text>
                    )}

                    <Text textColor={colors.primary} uppercase style={{ marginTop: spacing[4] }}> Shipping details </Text>

                    <Input
                        label="Address"
                        placeholder="12 london street"
                        onChangeText={formik.handleChange('address')}
                        onBlur={formik.handleBlur('address')}
                    />
                    {formik.touched.address && formik.errors.address && (
                        <Text preset="small" style={styles.inputErrorMessage}>{formik.errors.address}</Text>
                    )}

                    <Input
                        label="Zip code"
                        placeholder="23213"
                        onChangeText={formik.handleChange('zip')}
                        onBlur={formik.handleBlur('zip')}
                    />
                    {formik.touched.zip && formik.errors.zip && (
                        <Text preset="small" style={styles.inputErrorMessage}>{formik.errors.zip}</Text>
                    )}

                    <Input
                        label="City"
                        placeholder="London"
                        onChangeText={formik.handleChange('city')}
                        onBlur={formik.handleBlur('city')}
                    />
                    {formik.touched.city && formik.errors.city && (
                        <Text preset="small" style={styles.inputErrorMessage}>{formik.errors.city}</Text>
                    )}

                    <Input
                        label="Country"
                        placeholder="United Kingdom"
                        onChangeText={formik.handleChange('country')}
                        onBlur={formik.handleBlur('country')}
                    />
                    {formik.touched.country && formik.errors.country && (
                        <Text preset="small" style={styles.inputErrorMessage}>{formik.errors.country}</Text>
                    )}

                    <Text textColor={colors.primary} uppercase style={{ marginTop: spacing[4] }}> Payment details </Text>

                    <Checkbox text="Cash on Delivery" selected={true} />
                    <Checkbox text="Online payment (coming soon)" disable={true} />
                </View>

                {/* summary */}
                <View style={styles.summaryContainer}>
                    <Text preset="h6">Summary</Text>
                    <View style={{ marginTop: spacing[6] }}>
                        {cartItems.map((item, index) => {
                            const { id, featured_image, name, quantityPrice, amount } = item
                            return (
                                <View
                                    key={`checkout__${id}__${index}`}
                                    style={styles.cartItemContainer}
                                >
                                    <View style={{ flexDirection: "row", alignItems: "center" }} >
                                        <View style={styles.cartItemImageContainer}>
                                            <Image style={{ height: 36, width: 36 }}
                                                resizeMode="contain"
                                                source={{ uri: featured_image }}
                                            />
                                        </View>
                                        <View style={{ marginLeft: spacing[4] }} >
                                            <Text preset="title">{name}</Text>
                                            <Text textColor="#757575"> ${quantityPrice} </Text>
                                        </View>
                                    </View>
                                    <Text textColor="#757575">x{amount}</Text>
                                </View>
                            )
                        })}

                        <View style={{ marginVertical: spacing[5] }}>
                            <PriceView title="Total" price={totalPrice} />
                            <PriceView title="Shipping" price={SHIPPING_PRICE} />
                            <PriceView title="VAT (INCLUDED)" price={VAT} />
                            <PriceView title="Grand total" price={totalPrice + SHIPPING_PRICE + VAT} priceStyle={{ color: colors.primary }} />
                        </View>

                        <Button title="CONTINUE & PAY" fullWidth onPress={formik.handleSubmit} />
                    </View>
                </View>
            </ScrollView>
            {
                isOpenModal && (
                    <Modal isVisible={isOpenModal}>
                        <View style={styles.modalContainer}>
                            <AnimatedLottieView
                                autoPlay
                                style={{ height: 50, width: 50 }}
                                source={require('../../assets/images/success.json')}
                            />
                            <Text preset="h5" uppercase>Thank you</Text>
                            <Text preset="h5" uppercase>for your order</Text>
                            <Text textColor="#757575" style={{ paddingVertical: spacing[4] }}>
                                You will recieve an email confirmation shortly
                            </Text>

                            <View style={styles.modalContentContainer}>
                                <View style={styles.modalContentBox}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image
                                            style={{ height: 36, width: 36 }}
                                            resizeMode="contain"
                                            source={{ uri: cartItems?.[0]?.featured_image }}
                                        />
                                        <View style={{ marginTop: spacing[2], marginLeft: spacing[4] }}>
                                            <Text preset="title" >{cartItems[0]?.name}</Text>
                                            <Text textColor="#757575">${cartItems[0]?.quantityPrice}</Text>
                                        </View>
                                    </View>
                                    <Text>${cartItems[0]?.amount}</Text>
                                </View>
                                {
                                    cartItems.length > 1 && (
                                        <View style={{ marginTop: 12 }}>
                                            <Text> and {cartItems.length - 1} more</Text>
                                        </View>
                                    )
                                }
                            </View>

                            <View style={styles.totalContainer}>
                                <Text textColor="#fafafa">GRAND TOTAL</Text>
                                <Text
                                    preset="h5"
                                    textColor="white"
                                    style={{ paddingTop: spacing[2] }}
                                >{`$ ${totalPrice + SHIPPING_PRICE + VAT}`}</Text>
                            </View>

                            <Button
                                title="BACK TO HOME"
                                fullWidth
                                style={{ marginTop: spacing[6] }}
                                onPress={() => {
                                    toggleModal()
                                    dispatch(reset())
                                    navigation.navigate('Home')
                                }}
                            />
                        </View>
                    </Modal>
                )
            }
        </SafeAreaView>
    )
}

interface Props {
    title: string;
    price: number;
    priceStyle?: any
}

const PriceView = ({ title, price, priceStyle }: Props) => {
    return (
        <View style={styles.priceViewConatiner}>
            <Text>
                {title}
            </Text>
            <Text preset="h6" style={[priceStyle]}>{`$${price}`}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    formContainer: {
        padding: spacing[4],
        borderRadius: 12,
        backgroundColor: '#fff',
        margin: spacing[5]
    },
    inputErrorMessage: {
        color: 'red',
        marginTop: 1
    },
    summaryContainer: {
        padding: spacing[4],
        borderRadius: 12,
        backgroundColor: '#fff',
        margin: spacing[5]
    },
    cartItemContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
    },
    cartItemImageContainer: {
        backgroundColor: colors.grey,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        padding: spacing[5],
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: spacing[8],
        borderRadius: 12
    },
    modalContentContainer: {
        backgroundColor: colors.grey,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        paddingHorizontal: spacing[6],
        paddingVertical: spacing[4],
        borderBottomWidth: 1,
        borderBottomColor: "#979797",
    },
    modalContentBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    totalContainer: {
        paddingHorizontal: spacing[5],
        paddingVertical: spacing[4],
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        backgroundColor: "#000",
    },
    priceViewConatiner: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        marginHorizontal: spacing[3],
        marginBottom: spacing[1]
    }
})