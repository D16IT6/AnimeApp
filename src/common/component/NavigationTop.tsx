import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const {height,width} = Dimensions.get('window')

type NavagitonTopProps={
    title:string,
    OnPressArrowBack?:() => void,
    OnPressSearch?:() => void,
    search?:boolean,
    group?:boolean,
    OnPressGroup?:() => void
}
const NavagitonTop=(props: NavagitonTopProps) => {
    const {
        title,
        OnPressArrowBack=()=>{},
        OnPressSearch=()=>{},
        OnPressGroup=()=>{},
        search=false,
        group=false
    } = props
    return (
        <View style={styles.header}>
            <Ionicons name='arrow-back'
                onPress={() => {
                    OnPressArrowBack()
                }}
                size={30} color='#212121' />
            <Text style={styles.headerTitle}>{title}</Text>
            {search&&(
                <Ionicons name='search'
                onPress={() => {
                    OnPressSearch()
                }}
                size={30} color='#212121' />
            )}
            {group&&(
                <MaterialCommunityIcons 
                name='dots-horizontal-circle-outline'
                onPress={() => {
                    OnPressGroup()
                }}
                size={30} color='#212121'>

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
        alignItems:'center',
        paddingHorizontal:10
    },
    headerTitle:{
        flex:1,
        color:"#212121",
        fontFamily:"Urbanist",
        fontWeight:"bold",
        fontSize:20,
        marginHorizontal:20,
    },
})
export default NavagitonTop