import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { PrimaryColor } from "../Colors";

const { width, height } = Dimensions.get('window')
interface InputAuthScreenProps {
    placeholder: string;
    iconName: string;
    error?: string;
    password: boolean;
    onFocus: Function;
    onChangeText: (text: string) => void;
    children?: React.ReactNode;
}
const InputAuthScreen: React.FC<InputAuthScreenProps> = ({
    placeholder,
    iconName,
    error,
    password,
    onFocus,
    onChangeText,
    ...props
}) => {
    const [isFocus, setIsforcus] = useState(false)
    const [hidePassWord, setHidePassword] = useState(false)
    return (
        <View >
            <View style={[styles.inputContiner,
            {
                backgroundColor: isFocus ? '#ebfaf1' : '#FAFAFA',
                borderColor: error ? 'red' : isFocus ? PrimaryColor : '#FAFAFA' //neu loi do neu chon mau chinh else trang
            }
            ]}>
                <FontAwesomeIcons name={iconName} size={20} color={isFocus ? PrimaryColor : "#9e9e9e"} style={{ marginRight: 5 }} />

                <TextInput style={[styles.password, { backgroundColor: isFocus ? '#ebfaf1' : '#FAFAFA', }]}
                    autoCorrect={false}
                    placeholder={placeholder}
                    secureTextEntry={hidePassWord}
                    // value={value}   
                    onChangeText={(text) => {
                        onChangeText(text)
                    }}
                    onFocus={() => {
                        setIsforcus(!isFocus)
                        onFocus()
                    }}
                    onBlur={() => {
                        setIsforcus(!isFocus)
                    }}
                    {...props}
                >
                </TextInput>
                {
                    password && (
                        <MaterialCommunityIcons name={hidePassWord ? "eye" : "eye-off"}
                            onPress={() => {
                                setHidePassword(!hidePassWord)
                            }}
                            size={20} color={isFocus ? PrimaryColor : "#9e9e9e"} />
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
}
export default InputAuthScreen
const styles = StyleSheet.create({
    inputContiner: {
        flexDirection: 'row',
        borderRadius: 10,
        width: width * 0.9,
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#FAFAFA',
        paddingHorizontal: 15
    },
    password: {
        backgroundColor: '#FAFAFA',
        flex: 1
    },
    error: {
        color: "red",
        fontSize: 13,
        marginHorizontal: 5,
        marginTop: 5
    },

})