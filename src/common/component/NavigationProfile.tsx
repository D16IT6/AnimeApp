import React from "react";
import{View ,Text, SafeAreaView, StyleSheet, Dimensions} from "react-native"
import { Image } from "react-native-elements";
import { logo } from "../../common/Images";
import fontSizes from "../../common/FontSizes";
import fontFamily from "../../common/FontFamily";
import { Color } from "../../common/Colors";
import Entypo from "react-native-vector-icons/Entypo"

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
        <Entypo name={iconName} size={30} color={isLogout?"red":"black"} style={styles.iconNavigation}></Entypo>
        <Text style={[styles.titleNavigation,{color:isLogout?"red":Color.Black}]}>{title}</Text>
        {!isLogout&&(
             <Entypo name={"chevron-right"} size={30} color={"black"}
        onPress={()=>{  
        }}
        ></Entypo>
        )
        }
       
    </View>
}

export  default NavigationProfile

const styles = StyleSheet.create({
    container:{
        backgroundColor:Color.SecondaryColor,
        marginBottom:20,
        marginHorizontal:20,
        flexDirection:'row',
        height:height*0.06,
        justifyContent:'center',
        alignItems:'center'
    },
    titleNavigation:{
        flex:1,
        fontFamily:fontFamily.PrimaryFont,
        fontSize:18,
        fontWeight:'600',
    },
    iconNavigation:{
        marginHorizontal:10
    }
})