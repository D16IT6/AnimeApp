import React from "react";
import{View ,Text, SafeAreaView, StyleSheet, Dimensions} from "react-native"
import { Image } from "react-native-elements";
import { logo } from "../../common/Images";
import fontSizes from "../../common/FontSizes";
import fontFamily from "../../common/FontFamily";
import { Color } from "../../common/Colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const{width,height}=Dimensions.get("window");

type navigationProfileProps ={
    iconName:string,
    title:string,
    isLogout?:boolean
}

const NavigationProfile=(props:navigationProfileProps)=>{
    const {
        iconName,
        title,
        isLogout=false
    } = props
    return<View style={styles.container}>
        <Icon name={iconName} size={20} color={"black"}></Icon>
        <Text>{title}</Text>
    </View>
}

export  default NavigationProfile

const styles = StyleSheet.create({
    container:{
        width:width*0.05
    }
})