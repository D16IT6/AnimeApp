import React from "react";
import { View,Text ,Dimensions,StyleSheet, ActivityIndicator} from "react-native";
import { Color } from "../Colors";
import fontFamily from "../FontFamily";
import fontSizes from "../FontSizes";
const {width,height} =Dimensions.get('window')
const Loader = ({visible}:{visible:boolean}) =>{
    return(visible&&(
        <View style={styles.container}>
            <View style={styles.loader}>
             <ActivityIndicator size="large"  color={Color.PrimaryColor} style={{flex:1}}/>   
             <Text style={styles.textLoader}>Loading....</Text>      
            </View>
        </View>
    ))
}

export default Loader

const styles = StyleSheet.create({
    container:{
        width:width,
        height:height,
        position:'absolute',
        zIndex:10,
        backgroundColor:'rgba(0,0,0,0.5)',
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