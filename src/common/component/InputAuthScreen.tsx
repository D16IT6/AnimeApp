import React, { useState,useRef, useEffect } from "react";
import { View, Text, TextInput, StyleSheet ,Animated, Dimensions, StyleProp, ViewStyle } from "react-native";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import { Color } from "../Colors";

const { width, height } = Dimensions.get('window')
type InputAuthScreenProps = {
    placeholder: string;
    iconName?: string;
    error?: string;
    password?: boolean;
    onFocus?: Function;
    onChangeText: (text: string) => void;
    children?: React.ReactNode;
    style?:StyleProp<ViewStyle>;
    value?:any;
}

const InputAuthScreen: React.FC<InputAuthScreenProps> = ({
    placeholder,
    iconName,
    error,
    password=false,
    onFocus=()=>{},
    onChangeText,
    style,
    value,
    ...props
}) => {
    const [isFocus, setIsFocus] = useState(false)
    const [showPassWord, setShowPassword] = useState(false)
    const [isFocusPlacehoder, setIsFocusPlacehoder] = useState(false)
    const [inputs,setInputs] =useState('')
    const textInputRef = useRef<TextInput>(null);
    
    useEffect(()=>{
        if(inputs.length>0){
            setIsFocusPlacehoder(true)
            setInputs(value)
        }
        
    },[inputs])
    const handleTextPress = () => {
        if (textInputRef.current) {
          textInputRef.current.focus();
        }
      };
    return (
        <View>
        <View >
            <View style={[styles.inputContiner,
            {
                backgroundColor: isFocus ? '#ebfaf1' : '#FAFAFA',
                borderColor: error ? 'red' : isFocus ? Color.PrimaryColor : '#FAFAFA' //neu loi do neu chon mau chinh else trang
            },style
            ]}>
                {iconName&&
                <FontAwesomeIcons name={iconName} size={20} color={isFocus ? Color.PrimaryColor : "#9e9e9e"} style={{ marginRight: 5 }} />}
                <Text style={[styles.placeholder, 
                    {top:isFocusPlacehoder ? 0 : 11,
                    fontSize:isFocusPlacehoder  ? 13 : 18,
                    color:isFocusPlacehoder&&isFocus?Color.PrimaryColor:'#999',       
                }]
                }
                 onPress={handleTextPress}
                >
                    {placeholder}
                </Text>
                <TextInput style={[styles.input, { backgroundColor: isFocus ? '#ebfaf1' : '#FAFAFA' }]}
                
                    autoCorrect={false}
                    secureTextEntry={!showPassWord&&password}
                    value={value}
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
        left: 35,
        zIndex:1,
        pointerEvents:'none',
      },
})