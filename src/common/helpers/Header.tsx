import React from "react";
import { Text, TextProps } from "react-native"; // Import TextProps để sử dụng props của Text

type HeaderProps = {
    title?: string,
    fontSize?: number,
    color?: string,
    textAlign?: string | any,
    style?: TextProps['style'];
}

const Header = (props: HeaderProps) => {
    const { title = "Default header", fontSize = 20, color = 'black', textAlign = "center", style } = props;

    const combinedStyle = [
        {
            fontSize: fontSize,
            color: color,
            textAlign: textAlign
        },
        style
    ];

    return (
        <Text style={combinedStyle}>{title}</Text>
    )
}

export { Header };
