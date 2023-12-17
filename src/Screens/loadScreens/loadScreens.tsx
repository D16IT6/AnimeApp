import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Color } from "../../common/Colors";
import { logo } from "../../common/Images";

const {width,height}=Dimensions.get("window")
const LoadScreen =({visible,title}:{visible:boolean,title:string})=>{
        return(visible&&(
            <View style={styles.container}>
                <View style={styles.loader}>
                    <Image source={logo}></Image>
                 <Text style={styles.textLoader}>{title}....</Text>      
                </View>
            </View>
        ))
}

export default LoadScreen

const styles = StyleSheet.create({
    container:{
        width:width,
        height:height,
        position:'absolute',
        zIndex:10,
        backgroundColor:Color.SecondaryColor,
        justifyContent:"center",
        alignItems:'center'
    },
    loader:{
        height:height*0.1,
        width:width*0.8,
        backgroundColor:Color.SecondaryColor,
        borderRadius:10,
        flexDirection:'row',         
    },
    textLoader:{
        flex:3,
        paddingVertical:30,
        color:Color.Black,
        fontSize:20,       
    }
   
})