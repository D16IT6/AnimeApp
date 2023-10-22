import React, { useState } from "react";
import { Text, View, SafeAreaView, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthRoutes, AuthScreenNavigationProps } from "../../navigations/AuthNavigator";
import { useNavigation } from '@react-navigation/native'
import { PrimaryColor } from "../../common/Colors";
import { Loader } from "../../common/component";
import { NavagitonTop } from "../../common/component";
import { listNewEpisodeReleases } from "../../utils/data";

const { height, width } = Dimensions.get("window");

interface listAnimeProps {
    id: string,
    name: string,
    year: Number,
    contry: string,
    genre: string,
    url: string,
    rating: Number,
    episode: Number,
}
const getItem = (item:any)=>{
    Alert.alert(`Ban dang xem ${item.id} va${item.name}`)
}
const ListNewEpisodeReleases = ({ item,index }: { item: listAnimeProps,index:number }) => {
    var check = index%2==0;
    return (
        <TouchableOpacity style={[styles.contentAnime,
        {marginLeft:check?10:0,
        marginRight:check?0:10}
        ]}
        onPress={()=>getItem(item)}
        >
            <Image source={{ uri: item.url }}
            style ={styles.imageAnime}
            ></Image>
            <Text style={styles.ratingAnime}>{item.rating.toString()}</Text>
            <Text style={styles.episodeAnime}>episode {item.episode.toString()}</Text>
            
        </TouchableOpacity>
    )
}
const NewEpisodeReleases = () => {
    const navigation = useNavigation<AuthScreenNavigationProps>();
    return (
        <SafeAreaView style={styles.container}>
            <NavagitonTop
                title="New Episode Releases"
                OnPressArrowBack={() => {
                    navigation.navigate(AuthRoutes.MainNavigationBar)
                }}
                OnPressSearch={() => { Alert.alert("search") }}
                search={true}
               
            />
            <FlatList
                columnWrapperStyle={styles.columnWrapper}
                horizontal={false}
                numColumns={2}
                data={listNewEpisodeReleases}
                keyExtractor={(item: any) => item.id}
                renderItem={({ item,index}: { item: listAnimeProps,index:number }) => {
                    return (
                        <ListNewEpisodeReleases
                            item={item}
                            index={index}
                        />
                    )
                }}
            />
        </SafeAreaView>
    )
}

export default NewEpisodeReleases

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    columnWrapper:{
        justifyContent: 'space-evenly',
        marginTop:10
    },
    contentAnime: {
        position:"relative",
         width:width*0.4,
         height:height*0.25,  
    },
    imageAnime:{
        width:"100%",
        height:"100%",
        borderRadius:15
    },
    ratingAnime:{
        position:"absolute",
        backgroundColor:PrimaryColor,
        left:10,
        top:10,
        width:30,
        borderRadius:5,
        color:"#fff",
        textAlign:"center",
        fontFamily:"Urbanist",
        fontSize:15
    },
    episodeAnime:{
        position:"absolute",
        bottom:10,
        left:10,
        color:"#fff",
        backgroundColor:PrimaryColor,
        textAlign:"center",
        fontFamily:"Urbanist",
        borderRadius:5,
        textAlignVertical:'center',
        width:90
    }
})