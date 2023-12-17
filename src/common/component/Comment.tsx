import React,{useState,useEffect} from "react";

import { Alert, Dimensions, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import fontFamily from "../FontFamily";
import { Color } from "../Colors";
import { useNavigation } from "@react-navigation/native";
import { AuthRoutes, AuthScreenNavigationProps } from "../../navigations/AuthNavigator";
import { Image } from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import fontSizes from "../FontSizes";
import InputAuthScreen from "./InputAuthScreen";
import Feather from "react-native-vector-icons/Feather"
import EmojiPicker, {emojiFromUtf16} from "rn-emoji-picker"
import {emojis} from "rn-emoji-picker/dist/data"
import  getUserIdFromToken  from "../../utils/getUserId";
import { CommentRequestViewModel, CommentsProps } from "../../ModelView";
import { CommentApi } from "../../apiService/CommentService";
const {height,width}= Dimensions.get('window')

const Comments = (props:CommentsProps)=>{
    const{
        comment,
        replies
    }=props
    return(
        <View>
            <View style={styles.containerComent}>
                        <View style={styles.headerComments}>
                            <Image source={{ uri: comment.AvatarUrl }}
                                style={styles.avatarAuthor}
                            />
                            <Text style={styles.nameAuthor}>{comment.FullName}</Text>
                            {/* <Text style={styles.textComments}>phim nhu cc</Text> */}
                            <MaterialCommunityIcons               
                                name='dots-horizontal-circle-outline'
                                onPress={() => {                                
                                }}
                                size={30} color={Color.Black}>
                                </MaterialCommunityIcons>  
                        </View> 
                       <Text style ={styles.contentComments}>
                           {comment.Content}
                        </Text>
            
                        <View style ={styles.footter}>
                        <Text style={styles.timeComment}>{comment.CreatedDate}</Text>
                        <Text style={styles.reply}
                        onPress={()=>{
                            Alert.alert(`Dang coment ${comment.Id}`)
                        }}
                        > </Text>  
                        </View>
                       
                </View> 
                {/* {replies.length>0&&(
                            <View>
                                {replies.map((x)=>{
                                    return(
                                        <Reply
                                    key={x.id}
                                    comment={x}
                                    replies={[]}
                                    ></Reply>
                                    )
                                    
                                })}
                            </View>
                        )}         */}
        </View>
        
    )
        
   
}
const Reply=(props:CommentsProps)=>{
    const {
        comment,
        replies
    }=props
    return<View style={styles.replyContainer}>
        <View style={styles.headerComments}>
                            {/* <Image source={{ uri: comment.AvatarUrl }}
                                style={styles.avatarAuthor}
                            /> */}
                            <Text style={styles.nameAuthor}>{comment.FullName}</Text>
                            {/* <Text style={styles.textComments}>phim nhu cc</Text> */}
                            <MaterialCommunityIcons
                     
                                name='dots-horizontal-circle-outline'
                                onPress={() => {
                                    
                                }}
                                size={30} color={Color.Black}>

                                </MaterialCommunityIcons> 
                        </View> 
                       <Text style ={styles.contentComments}>
                           {comment.Content}
                        </Text>
                        <Text style={styles.timeComment}>{comment.CreatedDate}</Text>
            
    </View>
}
const InputComment=({animeId}:{animeId:number})=>{
    const [comment,setComment]=useState('')
    const [isDisabledBtn, setIsDisabledBtn] = useState(true);
    const lengthComment=comment.trim().length
    
    const putComment = async ()=>{
        const model:CommentRequestViewModel ={
            AnimeId:animeId,
            UserId: await getUserIdFromToken(),
            Content:comment.trim()
        }
         console.log(model)
        const putData = await CommentApi.putComment( model);
        if(putData!==undefined)
        {
            Alert.alert("Thêm comment thành công")
            setComment('')
        }
        else{
            Alert.alert("Thêm comment thất bại")
        }
    }
    useEffect(()=>{
        handleToggleDisabled()
    },[comment])
    const handleToggleDisabled = () => {
        if(lengthComment>0)
        {
            setIsDisabledBtn(false);
        }
        else{ 
            setIsDisabledBtn(true)
        }
      };
    
    const handleChildInputChange = (value:string) => {
        setComment(value);
      };

    return(
    <View style={styles.containerInput}>
       <InputAuthScreen
       placeholder="Add Comments"
       onChangeText={handleChildInputChange}
        value={comment}
       style={styles.inputComment}
       ></InputAuthScreen>
       <TouchableOpacity 
       style={[styles.sendInput,{backgroundColor:isDisabledBtn?'#e0e0e0':Color.PrimaryColor}]}
       disabled={isDisabledBtn}
       onPress={()=>{
        // Alert.alert(comment.trim())
        putComment()
        }}
       >
        <Feather name="send" size={40} color={isDisabledBtn?Color.Gray:Color.SecondaryColor}></Feather>
       </TouchableOpacity>
    </View>
    )
}

export  {Comments,InputComment,Reply}

const styles = StyleSheet.create({
    containerComent: {
        marginTop:10,
        backgroundColor:"#f0f2f5",
        borderRadius:10,
        marginHorizontal:10,
        padding:10
    },
    headerComments: {
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10
    },
   
    contentComments: {
        alignItems:'center',
        paddingHorizontal:10,
        fontSize:14,
        fontFamily:fontFamily.PrimaryFont,
        color:Color.Black,
        fontWeight:'400',
        lineHeight:20,
        letterSpacing:0.1
    },
    avatarAuthor: {
        width:45,
        height:45,
        borderRadius:50
    },
    nameAuthor:{
        marginLeft:20,
        fontFamily: fontFamily.PrimaryFont,
        fontSize: 20,
        fontWeight: "700",
        letterSpacing: 0.2,
        color: Color.Black,
        flex:1
    },
    footter:{
        marginTop:5,
        flexDirection:"row",
        marginHorizontal:10,
        alignItems:"center"
    },
    quantityLike:{
        marginLeft:5,
        fontFamily: fontFamily.PrimaryFont,
        fontSize: 14,
        fontWeight: "500",
        letterSpacing: 0.2,
        color: Color.Black,
        width:width*0.2
    },
    timeComment:{
        // width:width*0.2,
        fontFamily: fontFamily.PrimaryFont,
        fontSize: 11,
        fontWeight: "500",
        letterSpacing: 0.2,
        color: Color.Gray,
        marginLeft:10
    },
    reply:{
        fontFamily: fontFamily.PrimaryFont,
        fontSize: 14,
        fontWeight: "500",
        letterSpacing: 0.2,
        color: Color.Gray,
    },
    containerInput:{
        flexDirection:"row",
        backgroundColor:Color.SecondaryColor,
        height:height*0.1,
        width:width,
        justifyContent:"center",
        alignItems:"center",
        borderTopRightRadius:20,
        borderTopStartRadius:20
    },
    inputComment:{
       width: width*0.7,

    },
    sendInput:{
        width:width*0.17,
        height:width*0.17,
        marginLeft:20,
        justifyContent:"center",
        alignItems:'center',
        borderRadius:50,
    },
    replyContainer:{
        marginTop:10,
        marginLeft:30,
        padding:10,
        marginRight:10,
        borderColor:Color.Black,
        borderLeftWidth:2,
        backgroundColor:"#f0f2f5",
        borderBottomRightRadius:10,
        borderTopRightRadius:10,
    }
})