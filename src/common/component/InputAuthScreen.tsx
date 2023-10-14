import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet ,Animated, Dimensions } from "react-native";
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
    const [isFocus, setIsFocus] = useState(false)
    const [hidePassWord, setHidePassword] = useState(false)
    const [isFocusPlacehoder, setIsFocusPlacehoder] = useState(false)
    const translateY = new Animated.Value(isFocus ? -20 : 0);
    const fontSize = new Animated.Value(isFocus  ? 12 : 16);
    const [inputs,setInputs] =useState('')
    const handleFocus =()=>{ 
        setIsFocusPlacehoder(true)  
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: isFocusPlacehoder ? -20 : 0,
            //duration: 3000,
            useNativeDriver: false,
          }),
          Animated.timing(fontSize, {
            toValue: isFocusPlacehoder ? 12 : 16,
            //duration: 3000,
            useNativeDriver: false,
          }),
        ]).start();
    }
    const placeholderStyle = {
        transform: [{ translateY }],
        fontSize,
      };
    return (
        <View >
            <View style={[styles.inputContiner,
            {
                backgroundColor: isFocus ? '#ebfaf1' : '#FAFAFA',
                borderColor: error ? 'red' : isFocus ? PrimaryColor : '#FAFAFA' //neu loi do neu chon mau chinh else trang
            }
            ]}>
                <FontAwesomeIcons name={iconName} size={20} color={isFocus ? PrimaryColor : "#9e9e9e"} style={{ marginRight: 5 }} />
                <Animated.Text style={[styles.placeholder, placeholderStyle]}>
                    {placeholder}
                </Animated.Text>
                <TextInput style={[styles.password, { backgroundColor:'blue' }]}
                // backgroundColor: isFocus ? '#ebfaf1' : '#FAFAFA' 
                    autoCorrect={false}
                    //placeholder={placeholder}
                    secureTextEntry={hidePassWord}
                    // value={value}   
                    onChangeText={(text) => {
                        onChangeText(text)
                        setInputs(text)
                    }}
                    onFocus={() => {
                        setIsFocus(!isFocus)
                        onFocus()
                        handleFocus
                    }}
                    onBlur={() => { 
                        setIsFocus(!isFocus)
                        inputs!==''?setIsFocusPlacehoder(true):setIsFocusPlacehoder(false)//console.log("dungs"):console.log("sai")           
                    }
                   
                    }
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
        position:'relative',
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
    placeholder: {
        position: 'absolute',
        left: 40,
        top: 15,
        color: '#999',
        zIndex:10,
        backgroundColor:'red'
      },
})