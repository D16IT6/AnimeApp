import React from "react"
import { Image, StyleSheet, TouchableOpacity } from "react-native"
import fontFamily from "../FontFamily"
import { Color } from "../Colors"
import { Dimensions } from "react-native"
import { Text } from "react-native-elements"
import {  MyListResponseViewModel } from "../../ModelView"
const {width,height} = Dimensions.get('window')
const MyListAnime =({item}:{item:MyListResponseViewModel})=>{
    return(
        <TouchableOpacity 
        onPress={()=>{`Ban dang xem ${item.Title}`}}
        style={styles.containerAnime}
        >
            <Image 
            source={{uri:item.Poster}}
            style={styles.imageAnime}
            />
            <Text style={styles.nameAnime}>{item.Title}</Text>
    
    </TouchableOpacity>)
    }
export {MyListAnime}
const styles = StyleSheet.create({
    containerAnime:{
    flexDirection:'row',
    marginVertical:10,
},
imageAnime:{
    width:width*0.3,
    height:height*0.2,
    borderRadius:10
},
nameAnime:{
    flex:1,
    paddingLeft:30,
    textAlignVertical:'center',
    fontFamily: fontFamily.PrimaryFont,
    fontSize: 18,
    fontWeight:'700',
    color:Color.Black
},
})
