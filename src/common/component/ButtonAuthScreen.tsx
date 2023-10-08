import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions ,TouchableOpacity} from "react-native";
import { PrimaryColor } from "../Colors";

const { width, height } = Dimensions.get('window')

interface ButtonAuthScreenProps {
    title: string;
    onPress: () => void;
    children?: React.ReactNode;
  }
  const ButtonAuthScreen: React.FC<ButtonAuthScreenProps> = ({ title, onPress = () => { } }) => {
    return (
      <TouchableOpacity style={styles.buttoncontainer}
        onPress={
          onPress
        }>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    )
  }
export default ButtonAuthScreen
const styles = StyleSheet.create({
    buttoncontainer: {  
        marginHorizontal: 24,
        flexDirection: 'row',
        backgroundColor: PrimaryColor,
        height: height * 0.07,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginVertical: 10,
        width: width * 0.9,
      },
    title:{
        color:'#FFF',
        fontFamily:'Urbanist',
        fontSize:20
    },
})