import React from "react";
import { View, ViewProps } from "react-native"; // Import ViewProps để sử dụng props của View

type SeparatorProps = {
    marginY?: number,
    color?: string,
    width?: number,
    style?: ViewProps['style']
}

const Separator = (props: SeparatorProps) => {
    const {
        marginY = 8,
        color = '#737373',
        width = 1,
        style
    } = props;

    const combinedStyle = [
        {
            marginVertical: marginY,
            borderColor: color,
            borderWidth: width,
        },
        style
    ];

    return (
        <View style={combinedStyle} />
    )
}

export { Separator };
