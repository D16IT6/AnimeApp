import React, { createRef, useEffect, useRef } from "react"
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native"
import fontFamily from "../FontFamily"
import { Color } from "../Colors"
import { Text } from "react-native-elements"
import {   MyListUpdateViewModel } from "../../ViewModel"
import { apiMyList } from "../../apiService/MylistService"
import { Swipeable } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Screen from "../../utils/screenInformation"

const DeleteMylist = async (mylistId:number)=>{
    const result = await apiMyList.deleteMyList(mylistId)
    return result
}
type myListAnimeProps ={
    item:MyListUpdateViewModel,
    ResetData:Function,
    onOpentComponent: (index:number)=>void
}

type RightDeleteItemProps = {
    item:MyListUpdateViewModel,
    ResetData:Function,
}

const RightDeleteItem = (props:RightDeleteItemProps)=>{
    const{
        ResetData,
        item
    }=props
    // console.log(item)
    return (
        <TouchableOpacity style={styles.actionDelete} onPress={()=>{
            Alert.alert(
               'Xác nhận xoá',
               `Bạn có chắc chắn muốn xoá ${item.Title} khỏi danh sách yêu thích?`,
               [
                 {
                   text: 'Hủy',
                   style: 'cancel',
                 },
                 {
                   text: 'Xoá',
                   onPress:async () => {
                     // Gọi hàm để xoá mục khi người dùng xác nhận
                     await DeleteMylist(item.Id);
                     await ResetData();
                   },
                 },
               ],
               { cancelable: false }
             );
       }}>
        
           <Icon name ="delete" color={Color.SecondaryColor} size={40} />
       </TouchableOpacity>
    )
}

const MyListAnime =(props:myListAnimeProps)=>{
    const{
        item,
        ResetData,
        onOpentComponent
    }=props
    const swipeableRef = createRef<Swipeable>();
    useEffect(()=>{
        if(item.Opened===false)
        swipeableRef.current?.close()
    })
    return(
        <Swipeable renderRightActions={
        ()=>RightDeleteItem({ResetData,item})}
        
        onSwipeableOpen={()=>{
            // console.log("open "+item.Id)
            onOpentComponent(item.Id)
        
        }}
        ref={swipeableRef}
        >
             <TouchableOpacity 
        onPress={()=>{`Ban dang xem ${item.Title}`}}
        style={styles.containerAnime}
        >
            <Image 
            source={{uri:item.Poster}}
            style={styles.imageAnime}
            />
            <Text style={styles.RaitingAnime}>{item.Rating}/5</Text>
            <View style={styles.contentMylist}>
                <Text style={styles.nameAnime}>{item.Title}</Text>
            </View>   
    </TouchableOpacity>
        </Swipeable>
       )
    }
export {MyListAnime}
const styles = StyleSheet.create({
    containerAnime:{
    flexDirection:'row',
    backgroundColor:Color.SecondaryColor,
    marginVertical:10,
},
imageAnime:{
    width:Screen.width*0.3,
    height:Screen.height*0.2,
    borderRadius:10
},
contentMylist:{
    flex:1,
    paddingLeft:10,
    alignItems:"center",
    justifyContent:"center"
},
nameAnime:{
    paddingLeft:30,
    textAlignVertical:'center',
    fontFamily: fontFamily.PrimaryFont,
    fontSize: 18,
    fontWeight:'700',
    color:Color.Black
},
actionDelete:{
    backgroundColor:"#ff3737",
    justifyContent:'center',
    alignItems:"center",
    paddingHorizontal:10,
    paddingVertical:5,
    borderTopRightRadius:10,
    borderBottomRightRadius:10,
    // width:'30%',
    marginVertical:10,
},
RaitingAnime:{
    position:'absolute',
    top:10,
    left:10,
    backgroundColor:Color.PrimaryColor,
    paddingHorizontal:7,
    borderRadius:5

}

})
