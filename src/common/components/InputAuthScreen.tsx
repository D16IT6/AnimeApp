import React, { useState, useRef, forwardRef, useImperativeHandle, memo } from "react";
import { View, Text, TextInput, StyleSheet, StyleProp, ViewStyle } from "react-native";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { Color } from "../Colors";
import Screen from "../../utils/screenInformation";
import Animated, { Extrapolation, interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

type InputAuthScreenProps = {
    placeholder: string;
    iconName?: string;
    error?: string;
    password?: boolean;
    style?: StyleProp<ViewStyle>;
    value?: any;
    onSubmit?: () => void;
    onFocus?: () => void,
    onChangeText?:()=>void
}
export type InputAuthScreenRef = {
    setValue: (text: string) => void,
    getValue: () => string,
    onFocus: () => void,
}
const InputAuthScreen = memo(forwardRef<InputAuthScreenRef, InputAuthScreenProps>((props, ref) => {
    const {
        placeholder,
        iconName,
        error,
        password = false,
        style,
        onSubmit,
        onFocus,
        onChangeText,
    } = props
    const [isFocus, setIsFocus] = useState(false)
    const [showPassWord, setShowPassword] = useState(false)
    const [valueInput, setValueInput] = useState('')
    const labelPosion = useSharedValue(valueInput ? 1 : 0)
    const textInputRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => ({
        setValue: (text: string) => {
            animationLabel(1)
            setValueInput(text)
        },
        getValue: () => valueInput,
        onFocus: () => textInputRef.current?.focus(),
    }))

    const handleFocus = () => {
        setIsFocus(true)
        if (typeof onFocus === 'function') {
            onFocus();
        }
        animationLabel(1)
    }
    const handleBlur = () => {
        setIsFocus(false)
        if (!valueInput)
            animationLabel(0)
    }
    const handleChangeText = (text: string) => {
        setValueInput(text)
        if (typeof onChangeText === 'function') {
            onChangeText()
        }
    }

    const animationLabel = (toValue: number) => {
        labelPosion.value = withTiming(toValue, { duration: 300 })
    }

    const placeholderAnimation = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: interpolate(labelPosion.value, [0, 1], [0, -15], Extrapolation.CLAMP) },
                { translateX: interpolate(labelPosion.value, [0, 1], [0, 5], Extrapolation.CLAMP) },
            ],
            fontSize: interpolate(labelPosion.value, [0, 1], [18, 13], Extrapolation.CLAMP),
        }
    })
    return (
        <View>
            <View style={[styles.inputContiner,
            {
                backgroundColor: isFocus ? '#ebfaf1' : '#FAFAFA',
                borderColor: error ? 'red' : isFocus ? Color.PrimaryColor : '#FAFAFA' //neu loi do neu chon mau chinh else trang
            }, style
            ]}>
                {iconName &&
                    <FontAwesomeIcons name={iconName} size={20} color={isFocus ? Color.PrimaryColor : "#9e9e9e"} style={{ marginRight: 5 }} />}
                <Animated.Text style={[styles.placeholder,
                    placeholderAnimation,
                { color: isFocus ? Color.PrimaryColor : '#999' }
                ]}
                    onPress={() => { textInputRef.current?.focus() }}
                >
                    {placeholder}
                </Animated.Text>
                <TextInput style={[styles.input, { backgroundColor: isFocus ? '#ebfaf1' : '#FAFAFA' }]}
                    autoCorrect={false}
                    secureTextEntry={!showPassWord && password}
                    value={valueInput}
                    onChangeText={handleChangeText}
                    returnKeyType={onSubmit ? 'next' : 'done'}
                    onSubmitEditing={onSubmit}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    ref={textInputRef}
                >
                </TextInput>
                {
                    password && (
                        <MaterialCommunityIcons name={showPassWord ? "eye" : "eye-off"}
                            onPress={() => {
                                setShowPassword(!showPassWord)
                            }}
                            size={20} color={isFocus ? Color.PrimaryColor : "#9e9e9e"} />
                    )
                }

            </View>
            {
                error && (
                    <Text style={styles.error}>{error}</Text>
                )
            }
        </View>
    )
}))
export default InputAuthScreen
const styles = StyleSheet.create({
    inputContiner: {
        position: 'relative',
        flexDirection: 'row',
        borderRadius: 10,
        width: Screen.width * 0.9,
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#FAFAFA',
        paddingHorizontal: 15,
    },
    input: {
        backgroundColor: '#FAFAFA',
        flex: 1,
    },
    error: {
        color: "red",
        fontSize: 13,
        marginHorizontal: 5,
        marginTop: 5
    },
    placeholder: {
        position: 'absolute',
        left: 40,
        zIndex: 1,
        pointerEvents: 'none',
    },
})