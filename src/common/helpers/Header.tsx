import React from "react";
import { Text } from "react-native";

type HeaderProps = {
    title?: string,
    fontSize?: number,
    color?: string,
    textAlign?: string | any
}

const Header = (property: HeaderProps) => {
    const { title = "Default header", fontSize = 20, color = 'red', textAlign = "center" } = property;
    return (
        <Text style={
            {
                fontSize: fontSize,
                color: color,
                textAlign: textAlign

            }
        }>{title}
        </Text>
    )
}
export { Header };