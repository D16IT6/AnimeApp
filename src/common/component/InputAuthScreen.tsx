import React, { useState,useRef } from "react";
import { View, Text, TextInput, StyleSheet ,Animated, Dimensions } from "react-native";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { PrimaryColor } from "../Colors";

const { width, height } = Dimensions.get('window')
type InputAuthScreenProps = {
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
    const [inputs,setInputs] =useState('')
 
    const textInputRef = useRef<TextInput>(null);

    const handleTextPress = () => {
        if (textInputRef.current) {
          textInputRef.current.focus();
        }
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
                <Text style={[styles.placeholder, 
                    {top:isFocusPlacehoder ? -10 : 11,
                    fontSize:isFocusPlacehoder  ? 13 : 18,
                    color:isFocusPlacehoder&&isFocus?PrimaryColor:'#999',
                    backgroundColor:isFocusPlacehoder?'#fff':'#fafafa'
                }]
                }
                onPress={handleTextPress}
                >
                    {placeholder}
                </Text>
                <TextInput style={[styles.password, { backgroundColor: isFocus ? '#ebfaf1' : '#FAFAFA' }]}
                
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
                        setIsFocusPlacehoder(true)
                        
                    }}
                    onBlur={() => { 
                        setIsFocus(!isFocus)                    
                       inputs!==''?setIsFocusPlacehoder(true):setIsFocusPlacehoder(false)                         
                    }}
                    ref={textInputRef}
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
        left: 35,
        zIndex:1,
        pointerEvents:'none',
      },
})