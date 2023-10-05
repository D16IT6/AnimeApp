import { StyleSheet, Text, TextProps, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { CategoryViewModel } from "../viewModels";
import React, { useState } from "react";
import { PrimaryColor } from "../Colors";

type CategoryViewItemProps = {
    model: CategoryViewModel,
    touchableOpacityStyle?: TouchableOpacityProps['style'],
    textColor?: string,
    swapColor?: string,
    onPress?: Function,
    textStyle?: TextProps['style']
}

const CategoryViewItem = (props: CategoryViewItemProps) => {
    const [isSelect, setIsSelect] = useState(false);
    const changeState = () => {
        setIsSelect(x => !x)
    }
    const {
        model,
        touchableOpacityStyle = {},
        textColor = PrimaryColor,
        swapColor = 'white',
        onPress = () => { },
        textStyle = {},
    } = props;

    const combinedTouchOpacityStyle: TouchableOpacityProps['style'] = [
        styles.contentCategoryItem,
        touchableOpacityStyle,

    ]
    const combinedTextStyle: TextProps['style'] = [
        styles.contentCategoryText,
        textStyle
    ]

    return (
        <TouchableOpacity
            key={model.id}
            style={
                [
                    combinedTouchOpacityStyle,
                    { backgroundColor: isSelect ? textColor : swapColor },
                ]
            }
            onPress={
                () => {
                    changeState()
                    onPress()
                }
            }>
            <Text
                style={
                    [
                        combinedTextStyle,
                        { color: isSelect ? swapColor : textColor }
                    ]
                }
            >
                {model.name}
            </Text>
        </TouchableOpacity >
    )
}
const styles = StyleSheet.create({
    contentCategoryItem:
    {
        borderColor: PrimaryColor,
        padding: 12,
        borderRadius: 50,
        marginRight: 8,
        marginBottom: 12,
        borderWidth: 2

    },
    contentCategoryText:
    {
        paddingHorizontal: 10,
        fontSize: 18,
        fontWeight: '500',
    },
})
export { CategoryViewItem }