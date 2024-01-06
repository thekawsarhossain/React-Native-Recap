import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { colors, spacing } from '../theme'
import { Text } from './Text/Text'

interface Props {
    text: string;
    selected?: boolean;
    disable?: boolean
}

export default function Checkbox({ text, selected = false, disable = false }: Props) {
    return (
        <TouchableOpacity disabled={disable} style={[styles.wrapper, selected && styles.selectedWrapper, disable && { opacity: 0.4 },]}>
            <View style={styles.outerCircle}>
                <View style={[styles.innerCircle, selected && { backgroundColor: colors.primary }]} />
            </View>
            <Text style={{ marginLeft: 10 }} preset="subtitle">
                {text}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 15,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: spacing[2],
        borderWidth: 1,
        borderColor: '#cfcfcf'
    },
    selectedWrapper: {
        borderColor: colors.primary
    },
    outerCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#cfcfcf",
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircle: {
        height: 10,
        width: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#cfcfcf"
    },
})