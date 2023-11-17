import React,{useEffect, useState} from "react"; 
import { Dimensions, Keyboard, ViewStyle } from "react-native";
import { ScrollView, StatusBar, StyleSheet,KeyboardAvoidingView, Platform, View, SafeAreaView, StyleProp} from "react-native";


type KeyBoardAvoidingContainerProps={
    children:React.ReactNode,
    style?:StyleProp<ViewStyle>
}
const {height}= Dimensions.get('window')
const KeyboardAvoidingContainer =(props:KeyBoardAvoidingContainerProps)=>{
    const {
        children,
        style
    }=props 
    const [keyboardOffset, setKeyboardOffset] = useState(30);
    // console.log(keyboardOffset)
    // console.log(height)
    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
        setKeyboardOffset(0);
      });
  
      const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
        setKeyboardOffset(30);
      });
  
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, []);

    return(<SafeAreaView style={[style]}>
        <KeyboardAvoidingView
        style={style}
        behavior={Platform.OS==="ios"?"padding":"height"}
         keyboardVerticalOffset={keyboardOffset}
        >
            <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.contentContainer,style]}
            >
                {children}
            </ScrollView>
             
        </KeyboardAvoidingView>   
        </SafeAreaView>)

}

export default KeyboardAvoidingContainer;
const styles = StyleSheet.create({
    contentContainer:{
        // paddingTop:Platform.OS ==="android"?
        // (StatusBar.currentHeight?StatusBar.currentHeight + -50:50): 50,
    }
})