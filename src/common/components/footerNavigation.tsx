import React from "react"
import { Alert, StyleSheet, Text, TextProps, TouchableOpacity, TouchableOpacityProps, View, ViewProps } from "react-native"
import { Color } from '../Colors'
type ButtonProps = {
    viewStyle?: ViewProps['style'],

    leftTouchableOpacityStyle?: TouchableOpacityProps['style'],
    leftEvent?: Function,
    leftTextStyle?: TextProps['style'],
    leftTitle?: string,

    rightTouchableOpacityStyle?: TouchableOpacityProps['style'],
    rightEvent?: Function,
    rightTextStyle?: TextProps['style'],
    rightTitle?: string,

    disableLeftButton?: boolean,
    flex?: number

}
const FooterNavigation = (props: ButtonProps) => {

    const
        {
            viewStyle,
            leftTouchableOpacityStyle,
            leftEvent = () => { Alert.alert("Please implement event") },
            leftTextStyle,
            leftTitle = "Left Title",

            rightTouchableOpacityStyle,
            rightEvent = () => { Alert.alert("Please implement event") },
            rightTextStyle,
            rightTitle = "Right Title",

            disableLeftButton = false,
            flex = 1
        } = props;
    
    const leftWidth = disableLeftButton ? '0%' : '45%';
    const rightWidth = disableLeftButton ? '100%' : '45%';

    const combinedViewStyle: ViewProps['style'] = [
        styles.Container,
        {
            flex: flex
        },
        viewStyle
    ]
    const combinedLeftTouchableOpacityStyle: TouchableOpacityProps['style'] = [
        styles.Left,
        {
            width: leftWidth,
        },
        leftTouchableOpacityStyle,

    ]

    const combinedRightTouchableOpacityStyle: TouchableOpacityProps['style'] = [
        styles.Right,
        {
            width: rightWidth
        },
        rightTouchableOpacityStyle,

    ]


    const combinedLeftTextStyle: TextProps['style'] = [
        styles.LeftText,
        leftTextStyle
    ]

    const combinedRightTextStyle: TextProps['style'] = [
        styles.RightText,
        rightTextStyle
    ]

    const render = {
        renderLeft: () => {
            return (
                <TouchableOpacity
                    style={combinedLeftTouchableOpacityStyle}
                    onPress={
                        () => {
                            leftEvent()
                        }
                    }>
                    <Text style={combinedLeftTextStyle}>{leftTitle}</Text>
                </TouchableOpacity>
            )
        },
        renderRight: () => {
            return (
                <TouchableOpacity
                    style={combinedRightTouchableOpacityStyle}
                    onPress={
                        () => {
                            rightEvent()
                        }
                    }>
                    <Text style={combinedRightTextStyle}>{rightTitle}</Text>
                </TouchableOpacity>
            )
        }
    }
    return (
        <View style={combinedViewStyle}>
            {render.renderLeft()}
            {render.renderRight()}
        </View>
    )
}

const styles = StyleSheet.create({
    Container:
    {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        // backgroundColor: 'red',
        // // padding:5
    },
    Left:
    {
        backgroundColor: '#e6f9ed',
        borderRadius: 50,
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    LeftText:
    {
        color: Color.PrimaryColor,
        fontSize: 18

    },
    Right:
    {

        backgroundColor: Color.PrimaryColor,
        borderRadius: 50,
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    RightText:
    {
        color: 'white',
        fontSize: 18
    }
})
export { FooterNavigation }