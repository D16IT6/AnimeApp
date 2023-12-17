import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Color } from "../../common/Colors";
import { logo } from "../../common/Images";
import LottieView from "lottie-react-native";

const {width,height}=Dimensions.get("window")
const LoadScreen =({visible,title}:{visible:boolean,title:string})=>{
        return(visible&&(
            <View style={styles.container}>            
                    <Image source={logo} style={styles.logo}></Image>
                    <Text style={styles.textLoader}>{title}....</Text>  
                    <LottieView source={require("../../assets/animation/animation_loading.json") } style={styles.lottie} autoPlay loop></LottieView>                              
            </View>
        ))
}

export default LoadScreen

const styles = StyleSheet.create({
    container:{
        width:width,
        height:height,
        position:'absolute',
        zIndex:100,
        backgroundColor:Color.SecondaryColor,
        justifyContent:"center",
        alignItems:'center',
    },
    logo:{
        width:width*0.5,
        height:width*0.5,
        marginBottom:50
    },
    textLoader:{
        paddingVertical:30,
        color:Color.Black,
        fontSize:40,   
        textAlign:'center'    
    },
    lottie:{
        width:width*0.4,
        height:width*0.4
    }
   
})