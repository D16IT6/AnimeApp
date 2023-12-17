import React from "react"
import { Image, TouchableOpacity, View, TextProps, ImageProps, StyleSheet, ViewProps, ImageSourcePropType, Alert } from "react-native"
import { arrowLeftIcon } from "../Icons"
import { Header } from "../helpers/Header";

type NavigationBarProps = {
    icon?: ImageSourcePropType;
    onPress?: Function;
    title?: string;
    textColor?: string;
    textAlign?: string;
    viewStyle?: ViewProps['style']
    iconStyle?: ImageProps['style'];
    headerStyle?: TextProps['style'];
    flex?: number;

}
const NavigationBar = (props: NavigationBarProps) => {
    const
        {
            icon = arrowLeftIcon,
            onPress = () => { Alert.alert("No event","Please implement (onPress property)")},
            title,
            headerStyle,
            iconStyle,
            viewStyle,
            flex = 1
        } = props;
    const combinedHeaderStyle: TextProps['style'] = [
        headerStyle,
        {
            
        }
    ]
    const combinedIconStyle: ImageProps['style'] = [
        styles.headerIcon,
        iconStyle
    ]
    const combinedViewStyle: ViewProps['style'] = [
        styles.header,
        {
            flex:flex
        },
        viewStyle
    ]
    return (
        <View style={combinedViewStyle}>
            <TouchableOpacity onPress={() => {
                onPress()
            }}>
                <Image source={icon} style={combinedIconStyle} />
            </TouchableOpacity>
            <Header title={title} style={combinedHeaderStyle} />
        </View>
    )
}
const styles = StyleSheet.create({
    header:
    {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIcon:
    {
        marginRight: 10,
        width: 24,
        height: 24,
    }
})
export { NavigationBar }