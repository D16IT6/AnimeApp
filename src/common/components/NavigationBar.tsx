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

}
const NavigationBar = (props: NavigationBarProps) => {
    const
        {
            icon = arrowLeftIcon,
            onPress = () => { Alert.alert("No event","Please implement (onPress property)")},
            title,
            headerStyle,
            iconStyle,
            viewStyle
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
        flex: 1,
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