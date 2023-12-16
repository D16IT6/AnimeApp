import React, { useState } from "react"
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from "react-native"
import { Text } from "react-native-elements"
import fontFamily from "../FontFamily"
import fontSizes from "../FontSizes"
import ButtonAuthScreen from "./ButtonAuthScreen"
import { Color } from "../Colors"
import { ItemSeletorProps, SeletorAttribute } from "../../ModelView"


const handleOnpress =(props:ItemSeletorProps)=>{
    const { Attribute, Select, SetSelect ,MutiSeletion} = props;
    const newAtribute = Select.map((val)=>{
        if(val.Id===Attribute.Id){
            return{...val,"Selected":!val.Selected}
        }
        else
        {
            if(MutiSeletion)
            {
                return{...val}
            }
            return{...val,"Selected":false}
        }
        
    })
    SetSelect(newAtribute)
}

const ItemSeletor = (props:ItemSeletorProps) =>{
    const {
        Attribute,
        Index,
        Select,
        SetSelect,
        MutiSeletion
    }=props
    return(
       <TouchableOpacity style={[styles.BtnAttribute,
       {backgroundColor:Attribute.Selected?Color.PrimaryColor:Color.SecondaryColor}]}
       onPress={()=>{
         handleOnpress({Attribute,Select,SetSelect,MutiSeletion})
       }  
        }
       >
            <Text style={[styles.nameAttribute,
                {color:Attribute.Selected?Color.SecondaryColor:Color.PrimaryColor}]}
                >{Attribute.Name}</Text>
       </TouchableOpacity>
    )
}

const SelectorAttribtute = (props:SeletorAttribute )=>{
    const {
        title,
        listAttribute,
        setListAttribute,
        mutiSeletion=false,
    }=props
    return(
        <View style={styles.ContainerSeletor}>
        <Text style={styles.textTitle}>{title}</Text>
        <View style={styles.listSeletor}>

        {listAttribute && listAttribute.map((attribute, index) => (
        <ItemSeletor
            key={attribute.Id} // Thay 'id' bằng trường dữ liệu duy nhất trong attribute
            Attribute={attribute}
            Index={index}
            Select={listAttribute}
            SetSelect={setListAttribute}
            MutiSeletion={mutiSeletion}
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