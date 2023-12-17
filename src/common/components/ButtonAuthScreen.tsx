import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions ,TouchableOpacity, StyleProp, ViewStyle, TextStyle} from "react-native";
import { Color } from "../Colors";
import fontFamily from "../FontFamily";
const { width, height } = Dimensions.get('window')

type ButtonAuthScreenProps= {
    title: string;
    onPressBtn: () => void;
    styleBtn?:StyleProp<ViewStyle>
    styleTitle?:StyleProp<TextStyle>
  }
  const ButtonAuthScreen = (props:ButtonAuthScreenProps) => {
    const{
      title,
      onPressBtn,
      styleBtn,
      styleTitle
    } =props
    return (
      <TouchableOpacity style={[styles.buttoncontainer,styleBtn]}
        onPress={
          onPressBtn
        }>
        <Text style={[styles.title,styleTitle]}>{title}</Text>
      </TouchableOpacity>
    )
  }
export default ButtonAuthScreen
const styles = StyleSheet.create({
    buttoncontainer: {  
        marginHorizontal: 24,
        flexDirection: 'row',
        backgroundColor: Color.PrimaryColor,
        height: height * 0.07,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginVertical: 10,
        width: width * 0.9,
      },
    title:{
        color:Color.SecondaryColor,
        fontFamily:fontFamily.PrimaryFont,
        fontSize:20
    },
})