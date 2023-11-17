import React, { useState } from "react";
import { Alert, Dimensions, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { ButtonAuthScreen, NavagitonTop, SelectorAttribtute } from "../../common/component";
import { useNavigation } from '@react-navigation/native'
import { AuthRoutes, AuthScreenNavigationProps } from "../../navigations/AuthNavigator";
import { Color } from "../../common/Colors";
import { listCategories, listSort } from "../../utils/data";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window")

const handleReset = (select: any, setSelect: any) => {
    const newAttributes = select.map((attribute: any) => ({
        ...attribute,
        selected: false,
    }));
    setSelect(newAttributes);
};

const Filter = () => {

    const navigation = useNavigation<AuthScreenNavigationProps>()

    const [selectSort, setSelectSort] = useState(listSort.map((listAttribute) => {
        return { ...listAttribute, selected: false }
    }
    ));
    const [selectCategories, setSelectCategories] = useState(listCategories.map((listAttribute) => {
        return { ...listAttribute, selected: false }
    }
    ));
    // const [selectRegion, setSelectRegion] = useState(listSort.map((listAttribute)=>
    // {
    //     return{...listAttribute,selected:false}
    // }
    // ));
    // const [selectGenre, setSelectGenre] = useState(listSort.map((listAttribute)=>
    // {
    //     return{...listAttribute,selected:false}
    // }
    // ));
    // const [selectReleaseYear, setSelectReleaseYear] = useState(listSort.map((listAttribute)=>
    // {
    //     return{...listAttribute,selected:false}
    // }
    // ));
    const handleResetAll = () => {
        handleReset(selectSort, setSelectSort);
        handleReset(selectCategories, setSelectCategories);
        // handleReset(selectRegion, setSelectRegion);
        // handleReset(selectGenre, setSelectGenre);
        // handleReset(selectReleaseYear, setSelectReleaseYear);
    };

   //data
    const jsonData = {
        selectSort: selectSort.filter((attribute: any) => {
            if (attribute.selected === true) {
                return { ...attribute }
            }   
        }),
        selectCategories: selectCategories.filter((attribute: any) => {
            if (attribute.selected === true) {
                return { ...attribute }
            }
        })
    }



        return(
        <SafeAreaView style = { styles.container } >
            <NavagitonTop
            title="Sort & Filter"
            OnPressArrowBack={()=>{
                navigation.navigate(AuthRoutes.SearchAnime)
            }}
            ></NavagitonTop>
            <ScrollView>
                <SelectorAttribtute
                    title="Sort"
                    listAttribute={selectSort}
                    setListAttribute={setSelectSort}
                    />   
                    <SelectorAttribtute
                    title="Categories"
                    listAttribute={selectCategories}
                    setListAttribute={setSelectCategories}
                    /> 
                    {/* <SelectorAttribtute
                    title="Region"
                    listAttribute={selectSort}
                    setListAttribute={setSelectSort}
                    /> 
                     <SelectorAttribtute
                    title="Genre"
                    listAttribute={selectSort}
                    setListAttribute={setSelectSort}
                    /> 
                    <SelectorAttribtute
                    title="Release Year"
                    listAttribute={selectSort}
                    setListAttribute={setSelectSort}
                    />  */}
            </ScrollView>
            
                 
            <View style={styles.buttonContainer}>
                 <ButtonAuthScreen 
            title="Reset"
            onPressBtn={()=>{
                Alert.alert('Cảnh báo!!!', 'Bạn có chắc chắn muốn reset', [
                   
                    {
                      text: 'Không',
                      style: 'cancel',
                    },
                    {text: 'Đồng ý', onPress: () => {handleResetAll()}},
                  ]);
                
            }}
            styleBtn={styles.btnReset}
            styleTitle={styles.btnTitleReset}
            />
            
             <ButtonAuthScreen 
            title="Apply"
            onPressBtn={()=>{
                navigation.navigate(AuthRoutes.SearchAnime)   
                // console.log(JSON.stringify(jsonData))
                AsyncStorage.setItem("listSelected",JSON.stringify(jsonData))
            }}
            styleBtn={styles.btnApply}
            />
            </View>
           
        </SafeAreaView >
    )
}
export default Filter

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.SecondaryColor
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    btnApply: {
        width: width * 0.4,
    },
    btnReset: {
        width: width * 0.4,
        backgroundColor: "#e6f9ed",

    },
    btnTitleReset: {
        color: "#06C149"
    },

})