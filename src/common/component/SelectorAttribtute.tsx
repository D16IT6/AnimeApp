import React, { useState } from "react"
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from "react-native"
import { Text } from "react-native-elements"
import fontFamily from "../FontFamily"
import fontSizes from "../FontSizes"
import ButtonAuthScreen from "./ButtonAuthScreen"
import { Color } from "../Colors"

type AttributeProps ={
    id: Number,
    name:string,
    selected:boolean,
}
type SeletorAttribute ={
    listAttribute:AttributeProps[],
    title:string,
}

const ItemSeletor = (Attribute:AttributeProps,index:Number) =>{
    const[isSeleted,setSeleted]=useState(false)
    return(
       <TouchableOpacity style={[styles.BtnAttribute,
       {backgroundColor:isSeleted?Color.PrimaryColor:Color.SecondaryColor}]}
       onPress={()=>{setSeleted(!isSeleted)}}
       >
            <Text style={[styles.nameAttribute,
                {color:isSeleted?Color.SecondaryColor:Color.PrimaryColor}]}
                >{Attribute.name}</Text>
       </TouchableOpacity>
    )
}

const SelectorAttribtute = (props:SeletorAttribute)=>{
    const{
        title,
        listAttribute
    }=props
    const listAtributeSeleted =listAttribute.map((listAttribute)=>
    {
        return{...listAttribute,seleted:false}
    }
    )
    return(
        <View style={styles.ContainerSeletor}>
    <Text style={styles.textTitle}>{title}</Text>
    <View style={styles.listSeletor}>
    {
        listAtributeSeleted.map(ItemSeletor)
    }
    </View>
    </View>
   
    )
 }
export default SelectorAttribtute

const styles = StyleSheet.create({
    ContainerSeletor:{
        marginHorizontal:20,
    },
    textTitle:{
        marginVertical:10,
        fontFamily:fontFamily.PrimaryFont,
        fontSize:fontSizes.h3,
        fontWeight:'700',
        fontStyle:'normal',
    },
    listSeletor:{
        flexDirection:"row",
        flexWrap:"wrap"
    },
    BtnAttribute:{
         borderRadius:20,
        borderWidth:2,
        borderColor:Color.PrimaryColor,
        // height:Dimensions.get("window").height*0.04,
        alignItems:'center',
        justifyContent:'center',
        maxWidth:Dimensions.get("window").width,
        marginRight:5,
        marginTop:10
    },
    nameAttribute:{
        fontFamily:fontFamily.PrimaryFont,
        fontSize:16,
        fontWeight:'600',
        fontStyle:'normal',
        marginHorizontal:20,
         height:Dimensions.get("window").height*0.04,
         textAlignVertical:'center'
    }
})