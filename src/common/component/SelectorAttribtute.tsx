import React, { useState } from "react"
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from "react-native"
import { Text } from "react-native-elements"
import fontFamily from "../FontFamily"
import fontSizes from "../FontSizes"
import ButtonAuthScreen from "./ButtonAuthScreen"
import { Color } from "../Colors"

type AttributeProps ={
    id: number,
    name:string,
    selected?:boolean,
}
type SeletorAttribute ={
    listAttribute:AttributeProps[],
    title:string,
    setListAttribute:any
}
type ItemSeletorProps ={
    key?:number
    Attribute:AttributeProps,
    index?:number,
    select:AttributeProps[],
    setSelect:any
}
const handleOnpress =(props:ItemSeletorProps)=>{
    const { Attribute, select, setSelect } = props;
    const newAtribute = select.map((val)=>{
        if(val.id===Attribute.id){
            return{...val,selected:!val.selected}
        }
        else
        return{...val,selected:false}
    })
    setSelect(newAtribute)
}

const ItemSeletor = (props:ItemSeletorProps) =>{
    const {
        Attribute,
        index,
        select,
        setSelect
    }=props
    return(
       <TouchableOpacity style={[styles.BtnAttribute,
       {backgroundColor:Attribute.selected?Color.PrimaryColor:Color.SecondaryColor}]}
       onPress={()=>{
         handleOnpress({Attribute,select,setSelect})
       }  
        }
       >
            <Text style={[styles.nameAttribute,
                {color:Attribute.selected?Color.SecondaryColor:Color.PrimaryColor}]}
                >{Attribute.name}</Text>
       </TouchableOpacity>
    )
}

const SelectorAttribtute = (props:SeletorAttribute )=>{
    const {
        title,
        listAttribute,
        setListAttribute
    }=props
    return(
        <View style={styles.ContainerSeletor}>
        <Text style={styles.textTitle}>{title}</Text>
        <View style={styles.listSeletor}>
        {listAttribute.map((attribute, index) => (
        <ItemSeletor
            key={attribute.id} // Thay 'id' bằng trường dữ liệu duy nhất trong attribute
            Attribute={attribute}
            index={index}
            select={listAttribute}
            setSelect={setListAttribute}
        />
        ))}
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