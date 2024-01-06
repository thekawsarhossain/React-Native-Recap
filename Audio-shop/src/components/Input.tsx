import React from 'react'
import { View, TextInput } from 'react-native'
import { spacing } from '../theme'
import { Text } from './Text/Text'

interface Props {
    label: string;
    placeholder: string;
    onChangeText?: (text: string) => void;
    onBlur?: (e: unknown) => void
}

export default function Input({ label, placeholder, onChangeText, onBlur }: Props) {
    return (
        <View style={{ paddingVertical: spacing[3] }}>
            <Text preset="subtitle" style={{ paddingBottom: spacing[3] }}>
                {label}
            </Text>
            <TextInput
                placeholder={placeholder}
                style={{ borderWidth: 1, borderRadius: 8, borderColor: '#cfcfcf', padding: 12 }}
                onChangeText={onChangeText}
                onBlur={onBlur}
            />
        </View>
    )
}