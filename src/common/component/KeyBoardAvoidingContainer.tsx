import React from "react"; 
import { Dimensions, ViewStyle } from "react-native";
import { ScrollView, StatusBar, StyleSheet,KeyboardAvoidingView, Platform, View, SafeAreaView, StyleProp} from "react-native";


type KeyBoardAvoidingContainerProps={
    children:React.ReactNode,
    style?:StyleProp<ViewStyle>
}

const KeyboardAvoidingContainer =(props:KeyBoardAvoidingContainerProps)=>{
    const {
        children,
        style
    }=props 
    return(<SafeAreaView style={style}>
        <KeyboardAvoidingView
        style={style}
        behavior={Platform.OS==="ios"?"padding":"height"}
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