import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Color } from "../Colors";
import fontFamily from "../FontFamily";
const {height,width} = Dimensions.get('window')

type NavagitonTopProps={
    title?:string,
    OnPressArrowBack?:() => void,
    OnPressSearch?:() => void,
    search?:boolean,
    group?:boolean,
    OnPressGroup?:() => void,
    backgroudcolor?:any,
    styleArrowBack?:any
    backgrourdColor?:any
    titleStyle?:any
    
}
const NavagitonTop=(props: NavagitonTopProps) => {
    const {
        title='',
        OnPressArrowBack=()=>{},
        OnPressSearch=()=>{},
        OnPressGroup=()=>{},
        search=false,
        group=false,
        backgrourdColor=Color.SecondaryColor,
        titleStyle
    } = props
    return (
        <View style={[styles.header,{backgroundColor:backgrourdColor}]}>
            <Ionicons name='arrow-back'
                onPress={() => {
                    OnPressArrowBack()
                }}
                size={30} color={Color.Black} />
            <Text style={titleStyle?titleStyle:styles.headerTitle}>{title}</Text>
            {search&&(
                <Ionicons name='search'
                onPress={() => {
                    OnPressSearch()
                }}
                size={30} color={Color.Black} />
            )}
            {group&&(
                <MaterialCommunityIcons 
                name='dots-horizontal-circle-outline'
                onPress={() => {
                    OnPressGroup()
                }}
                size={30} color={Color.Black}>

                </MaterialCommunityIcons>
            )
            }               
        </View>
    )
}
const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        height:height*0.06,
        // flex:0.3,
        alignItems:'center',
        paddingHorizontal:10,
    },
    headerTitle:{
        flex:1,
        color:Color.Black,
        fontFamily:fontFamily.PrimaryFont,
        fontWeight:"bold",
        fontSize:20,
        marginHorizontal:20,
    },
})
export default NavagitonTop