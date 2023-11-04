import React from "react";
import { Comments, InputComment, KeyboardAvoidingContainer, NavagitonTop, Reply } from "../../common/component";
import { KeyboardAvoidingView, SafeAreaView, Text, View,ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthRoutes, AuthScreenNavigationProps } from "../../navigations/AuthNavigator";
import { Color } from "../../common/Colors";
const CommentsScreens = ()=>{
    const navigation = useNavigation<AuthScreenNavigationProps>()
    return (
        <SafeAreaView style={{flex:1,backgroundColor:Color.SecondaryColor}}>
                <NavagitonTop
        title="29.5K Comments"
        OnPressArrowBack={()=>{
            navigation.navigate(AuthRoutes.AnimeDetails)
        }}
        group={true}
        ></NavagitonTop>
        <ScrollView >
             <Comments/>
        <Reply/>
        <Reply/>
        <Reply/>
        <Reply/>
        <Comments/>
        <Reply/>
        <Comments/>
        <Reply/>
        <Comments/>
        <Reply/>
        </ScrollView>
       
        <View style={{
        position:'absolute',
        bottom:0
        }}>    
            <InputComment></InputComment>
        </View>
        </SafeAreaView>
    )
    
   
    
    
}

export default CommentsScreens