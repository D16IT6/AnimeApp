import React from "react";
import { Alert, Dimensions, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { ButtonAuthScreen, NavagitonTop, SelectorAttribtute } from "../../common/component";
import { useNavigation } from '@react-navigation/native'
import { AuthRoutes, AuthScreenNavigationProps } from "../../navigations/AuthNavigator";
import { Color } from "../../common/Colors";
import { listSort } from "../../utils/data";

const {width,height}=Dimensions.get("window")
const Filter = () => {
    const navigation = useNavigation<AuthScreenNavigationProps>()
    return(
        <SafeAreaView style={styles.container}>
            <NavagitonTop
            title="Sort & Filter"
            OnPressArrowBack={()=>{
                navigation.navigate(AuthRoutes.SearchAnime)
            }}
            ></NavagitonTop>
            <ScrollView>
                <SelectorAttribtute
                    title="Sort"
                    listAttribute={listSort}
                    />   
                    <SelectorAttribtute
                    title="Categories"
                    listAttribute={listSort}
                    /> 
                    <SelectorAttribtute
                    title="Region"
                    listAttribute={listSort}
                    /> 
                     <SelectorAttribtute
                    title="Genre"
                    listAttribute={listSort}
                    /> 
                    <SelectorAttribtute
                    title="Release Year"
                    listAttribute={listSort}
                    /> 
            </ScrollView>
            
                 
            <View style={styles.buttonContainer}>
                 <ButtonAuthScreen 
            title="Reset"
            onPressBtn={()=>{
                Alert.alert("Reset")
            }}
            styleBtn={styles.btnReset}
            styleTitle={styles.btnTitleReset}
            />
            
             <ButtonAuthScreen 
            title="Apply"
            onPressBtn={()=>{
                Alert.alert("Apply")
            }}
            styleBtn={styles.btnApply}
            />
            </View>
           
        </SafeAreaView>
    )
}

export default Filter

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Color.SecondaryColor
    },
    buttonContainer:{
        flexDirection:"row",
        justifyContent:"space-around"
    },
    btnApply:{
        width:width*0.4,
    },
    btnReset:{
        width:width*0.4,
        backgroundColor:"#e6f9ed",
        
    },
    btnTitleReset:{
        color:"#06C149"
    },
   
})