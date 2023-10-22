import React, { useState } from "react";
import { Text,View,SafeAreaView, FlatList, StyleSheet, Dimensions,Image, TouchableOpacity ,Alert} from "react-native";
//import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthRoutes, AuthScreenNavigationProps } from "../../navigations/AuthNavigator";
import { useNavigation } from '@react-navigation/native'
import { PrimaryColor } from "../../common/Colors";
import { Loader } from "../../common/component";
import { NavagitonTop } from "../../common/component/index";
import { listHotAnimeData } from "../../utils/data";
const{height,width} =Dimensions.get("window");
interface listAnimeProps {
    id:string,
    name:string,
    year:Number,
    contry:string,
    genre:string,
    url:string,  
    rating:Number,
}
const getItem = (item:any) =>{
  Alert.alert(`Ban dang xem ${item.id} va${item.name}`)
}
const ListAnimeHot=({item}:{item:listAnimeProps})=>{
  const [addMyList,setAddMyList]=useState(false);
    return(
        <TouchableOpacity style={styles.containerAnime}
        onPress={()=>{
          getItem(item)
        }}
        >
            <View style={styles.container_image_raiting}>
                 <Image source={{uri:item.url}}
                    style={styles.image}
                 ></Image>
                 <Text style={styles.raiting}> {item.rating.toString()}</Text>
            </View>
           <View style={styles.contentAnime}>
            <Text style={styles.nameAnime}>{item.name}</Text>
            <Text style={styles.year_contryAnime}>{item.year.toString()} | {item.contry}</Text>
      
            <Text style={styles.genreAnime}>Genre: {item.genre}</Text>
            <TouchableOpacity 
            style={[styles.btnAddMylist,
            {backgroundColor:addMyList?"#fff":PrimaryColor}]}
            onPress={()=>{setAddMyList(!addMyList)
            }}>
              <Ionicons name={addMyList?"checkmark":"add"} size={20} color={addMyList?PrimaryColor:"#ffffff"}></Ionicons>
              <Text style={[styles.btnText,
                {color:addMyList?PrimaryColor:"#ffffff"}
                ]}>My List</Text>
            </TouchableOpacity>
           </View>     
        </TouchableOpacity>
    )
}

const HitAnime =()=>{
    const navigation =useNavigation<AuthScreenNavigationProps>();
    return(
    <SafeAreaView style={styles.container}>
      <NavagitonTop
      title="Top Hits Anime"
      OnPressArrowBack ={
        ()=>{
          navigation.navigate(AuthRoutes.MainNavigationBar);
        }}
      OnPressSearch={()=>{
        Alert.alert("search")
      }}
      search={true}
      />
        <FlatList 
        data={listHotAnimeData}
        keyExtractor={(item:any) => item.id}
        renderItem={({item}:{item:listAnimeProps})=>{
            return(
                <ListAnimeHot
                item={item} 
                />
            )
        }}
        
        />

       
    </SafeAreaView>
    )
}

export default HitAnime

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF'
    },
    
    containerAnime:{
        paddingHorizontal:20,
        height:height*0.2,
        marginBottom:10,
        flexDirection:"row"
    },
    container_image_raiting:{
        position:'relative',
        width:width*0.35
    },
    image:{
        width:'100%',
        height:'100%',
        borderRadius:10
    },
    raiting:{
        position:'absolute',
        top:10,
        left:10,
        backgroundColor:PrimaryColor,
        textAlign:'center',
        width:30,
        height:20,
        color:"#fff",
        borderRadius:5
    },
    contentAnime:{
      marginHorizontal:20,
      width:width*0.6
    },
    nameAnime:{
      fontSize:20,
      fontWeight:"bold",
      color:"#212121",
      fontFamily:"Urbanist"
    },
    year_contryAnime:{
      marginVertical:10,
      fontWeight:'600',
      color:'#424242',
      fontSize:16
    },
    genreAnime:{
      color:"#424242",
      fontSize:14,
      fontWeight:'500'
    },
    btnAddMylist:{
      marginTop:10,
      width:width*0.25,
      height:height*0.04,
      alignItems:'center',
      justifyContent:'space-evenly',
      flexDirection:'row',
      borderRadius:20,
      borderColor:PrimaryColor,
      borderWidth:2
    },
    btnText:{
        fontWeight:'600',
        fontSize:16,
        fontFamily:'Urbanist'
    }
})