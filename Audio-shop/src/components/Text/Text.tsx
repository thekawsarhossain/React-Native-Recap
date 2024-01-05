import React, { ReactNode } from "react";
import { Text as ReactNativeText, StyleProp, TextStyle, ViewStyle } from "react-native";
import { presets } from "./text.preset";
import { mergeAll, flatten } from "ramda";

interface Props {
    children: ReactNode;
    white?: boolean;
    style?: StyleProp<TextStyle>;
    centered?: boolean;
    textColor?: string;
    uppercase?: boolean;
    [key: string]: any;
    preset?: keyof typeof presets;
}

export const Text: React.FC<Props> = (props) => {
    const {
        preset = "default",
        children,
        style: styleOverride,
        textColor,
        centered,
        white,
        uppercase,
        ...rest
    } = props;

    const style = mergeAll(
        flatten([presets[preset] || presets.default, styleOverride])
    );

    return (
        <ReactNativeText
            {...rest}
            style={[
                style,
                textColor ? { color: textColor } : {},
                centered && { textAlign: "center" },
                white && { color: "#fff" },
                uppercase && { textTransform: "uppercase" },
            ]}
        >
            {children}
        </ReactNativeText>
    );
}
