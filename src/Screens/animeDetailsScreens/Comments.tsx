import React,{useEffect, useState} from "react";
import { Comments, InputComment, KeyboardAvoidingContainer, NavagitonTop, Reply } from "../../common/component";
import { KeyboardAvoidingView, SafeAreaView, Text, View,ScrollView, Dimensions, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthRoutes, AuthScreenNavigationProps } from "../../navigations/AuthNavigator";
import { Color } from "../../common/Colors";
import { getCommets } from "../../utils/data";
import axios from "axios";

const {width,height} = Dimensions.get("window")
const CommentsScreens = ()=>{

    useEffect(()=>{
    axios.get(`http://talonezio.click:1707/API/Anime/Hit/10`)
    .then((rep)=>{
            console.log(rep.data)
        })
    .catch((e)=>{
        console.log(e)
    })
    },[])
   

    const navigation = useNavigation<AuthScreenNavigationProps>()
    const[backEndComments,setBackEndComments] = useState(getCommets);

    const rootComments = backEndComments.filter((Comments)=>{
        return Comments.parentId===null
    })
    const getReplies = (commentId:string)=>{
        return backEndComments
        .filter((backEndComments)=> backEndComments.parentId===commentId)
        .sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    }
    // backEndComments.forEach((x)=>{
    //     console.log(new Date(x.createdAt).getDay())
    // })
    // console.log(getReplies("1"))
    return (
        <SafeAreaView style={{flex:1,backgroundColor:Color.SecondaryColor}}>
                <NavagitonTop
        title={`${backEndComments.length} Comments`}
        OnPressArrowBack={()=>{
            navigation.navigate(AuthRoutes.AnimeDetails)
        }}
        group={true}
        ></NavagitonTop>
        <ScrollView style={styles.scrollViewContainer}>
             {rootComments.map((rootComments)=>{
                return<Comments 
                key={rootComments.id}
                comment ={rootComments}
                replies ={getReplies(rootComments.id)}
                /> 
             })}
        </ScrollView>
       
        <View style={styles.bottomInput}>    
            <InputComment></InputComment>
        </View>
        </SafeAreaView>
    )
    
   
    
    
}

export default CommentsScreens

const styles = StyleSheet.create({
    scrollViewContainer:{
        marginBottom:height*0.1,
    },
    bottomInput:{
        position:'absolute',
        bottom:0,
    }
})