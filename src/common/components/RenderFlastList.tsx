import React from "react"
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native"
import fontFamily from "../FontFamily"
import { Color } from "../Colors"
import { Dimensions } from "react-native"
import { Text } from "react-native-elements"
import {  MyListResponseViewModel } from "../../ModelView"
import { apiMyList } from "../../apiService/MylistService"
const {width,height} = Dimensions.get('window')

const DeleteMylist = async (mylistId:number)=>{
    const result = await apiMyList.deleteMyList(mylistId)
    return result
}
type myListAnimeProps ={
    item:MyListResponseViewModel,
    ResetData:Function
}
const MyListAnime =(props:myListAnimeProps)=>{
    const{item,
    ResetData
    }=props
    return(
        <TouchableOpacity 
        onPress={()=>{`Ban dang xem ${item.Title}`}}
        style={styles.containerAnime}
        >
            <Image 
            source={{uri:item.Poster}}
            style={styles.imageAnime}
            />
            <View style={styles.contentMylist}>
                <Text style={styles.nameAnime}>{item.Title}</Text>
                <TouchableOpacity style={styles.actionDelete} onPress={()=>{
                     Alert.alert(
                        'Xác nhận xoá',
                        'Bạn có chắc chắn muốn xoá mục này khỏi danh sách?',
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
                    <Text style={styles.titleActionDelete}>Xoá</Text>
                </TouchableOpacity>
            </View>
            
    
    </TouchableOpacity>)
    }
export {MyListAnime}
const styles = StyleSheet.create({
    containerAnime:{
    flexDirection:'row',
    marginVertical:10,
},
imageAnime:{
    width:width*0.3,
    height:height*0.2,
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
    borderRadius:10,
},
titleActionDelete:{
    textAlignVertical:'center',
    fontFamily: fontFamily.PrimaryFont,
    fontSize: 14,
    fontWeight:'700',
    color:Color.SecondaryColor
}
})
