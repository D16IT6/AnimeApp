import React, { useState } from "react";
import { Text,View,SafeAreaView, FlatList, StyleSheet, Dimensions,Image, TouchableOpacity } from "react-native";
//import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthRoutes, AuthScreenNavigationProps } from "../../navigations/AuthNavigator";
import { useNavigation } from '@react-navigation/native'
import { PrimaryColor } from "../../common/Colors";
import { Loader } from "../../common/component";

const{height,width} =Dimensions.get("window");
const listHotAnimeData = [
    {
      id: '1',
      name:'Attack on Titan Final Season Part 2',
      year:2022,
      contry:'Japan',
      genre:'Action fiction, Dark fantasy, Apocalyptic, Drama, Shōnen, ...',
      url: 'https://imgur-com.cdn.ampproject.org/i/imgur.com/nZu9ClH.jpg',
      rating: 9.7
    },
    {
      id: '2',
      name:'Attack on Titan Final Season Part 2',
      year:2022,
      contry:'Japan',
      genre:'Action fiction, Dark fantasy, Apocalyptic, Drama, Shōnen, ...',
      url: 'https://imgur-com.cdn.ampproject.org/i/imgur.com/4sutpRK.jpg',
      rating: 9.6
    },
    {
      id: '3',
      name:'Attack on Titan Final Season Part 2',
      year:2022,
      contry:'Japan',
      genre:'Genre: Action fiction, Dark fantasy, Apocalyptic, Drama, Shōnen, ...',
        url: 'http://172.234.73.7/Uploads/Images/ao1.jpg',
      rating: 9.1
    },
    {
        id: '4',
        name:'Attack on Titan Final Season Part 2',
      year:2022,
      contry:'Japan',
      genre:'Genre: Action fiction, Dark fantasy, Apocalyptic, Drama, Shōnen, ...',
       url: 'http://172.234.73.7/Uploads/Images/ao1.jpg',
        rating: 9.0
      },
      {
        id: '5',
        name:'Attack on Titan Final Season Part 2',
      year:2022,
      contry:'Japan',
      genre:'Genre: Action fiction, Dark fantasy, Apocalyptic, Drama, Shōnen, ...',
       url: 'http://172.234.73.7/Uploads/Images/ao1.jpg',
        rating: 9.8
      },
  ];
interface listAnimeProps {
    id:string,
    name:string,
    year:Number,
    contry:string,
    genre:string,
    url:string,  
    rating:Number,
}
const ListAnimeHot=({item}:{item:listAnimeProps})=>{
  const [addMyList,setAddMyList]=useState(false);
    return(
        <View style={styles.containerAnime}>
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
        </View>
    )
}

const HitAnime =()=>{
    const navigation =useNavigation<AuthScreenNavigationProps>();
    return(
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
        <Ionicons name='arrow-back'
          onPress={() => {
            navigation.navigate(AuthRoutes.MainNavigationBar);
          }}
          size={30} color='#212121' />
          <Text style={styles.headerTitle}>Top Hits Anime</Text>
          <Ionicons name='search'
          onPress={() => {
            navigation.goBack();
          }}
          size={30} color='#212121' />
        </View>
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