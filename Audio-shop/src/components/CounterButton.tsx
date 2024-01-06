import React, { Dispatch, SetStateAction } from 'react'
import { View, StyleSheet, Pressable, StyleProp, TextStyle } from 'react-native'
import { colors } from '../theme'
import { Text } from './Text/Text'

interface Props {
    amount: number;
    setAmount: Dispatch<SetStateAction<number>>;
    style?: StyleProp<TextStyle>;
}

export default function CounterButton({ style, setAmount, amount }: Props) {
    const onIncrement = () => {
        setAmount(amount + 1)
    }

    const onDecrement = () => {
        if (amount > 0) {
            setAmount(amount - 1)
        }
    }
    return (
        <View style={[styles.wrapper, style]}>
            <Pressable onPress={onDecrement} style={styles.counterBtn}>
                <Text style={styles.btnText} textColor="#c4c4c4">-</Text>
            </Pressable>
            <Text>
                {amount}
            </Text>
            <Pressable onPress={onIncrement} style={styles.counterBtn}>
                <Text style={styles.btnText} textColor="#c4c4c4">+</Text>
            </Pressable>
        </View>
    )
}


const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        width: 120,
        height: 48,
        flexDirection: 'row',
        backgroundColor: colors.grey,
        borderRadius: 4,
    },
    counterBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        fontWeight: 'bold',
    }
})