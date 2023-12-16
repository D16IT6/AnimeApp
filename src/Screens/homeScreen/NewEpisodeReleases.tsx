import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthRoutes, AuthScreenNavigationProps } from "../../navigations/AuthNavigator";
import { useNavigation } from '@react-navigation/native'
import { Color } from "../../common/Colors";
import { Loader } from "../../common/component";
import { NavagitonTop } from "../../common/component";
import { listNewEpisodeReleases } from "../../utils/data";
import fontFamily from "../../common/FontFamily";
import { AnimeNewEpisodeReleasesViewModel } from "../../ModelView";
import { getAnimNewEpisodeRelease } from "../../apiService/AnimeService";


const { height, width } = Dimensions.get("window");

const getItem = (item:any)=>{
    Alert.alert(`Ban dang xem ${item.id} va${item.name}`)
}
const ListNewEpisodeReleases = ({ item,index }: { item: AnimeNewEpisodeReleasesViewModel,index:number }) => {
    var check = index%2==0;
    return (
        <TouchableOpacity style={[styles.contentAnime,
        {marginLeft:check?10:0,
        marginRight:check?0:10}
        ]}
        onPress={()=>getItem(item)}
        >
            <Image source={{ uri: item.Poster }}
            style ={styles.imageAnime}
            ></Image>
            <Text style={styles.ratingAnime}>{item.Rating}</Text>
            <Text style={styles.episodeAnime}>episode {item.CurrentEpisode.toString()}</Text>
            
        </TouchableOpacity>
    )
}
const NewEpisodeReleases = () => {

    const [listAnimeNewEpisodeReleases,setListAnimeNewEpisodeReleases] = useState<AnimeNewEpisodeReleasesViewModel[]>();
    const navigation = useNavigation<AuthScreenNavigationProps>();
    useEffect (()=>{
        const fetchData = async ()=>{
          const resultAnimeNewEpisodeReleases = await getAnimNewEpisodeRelease(1,6)
          setListAnimeNewEpisodeReleases(resultAnimeNewEpisodeReleases)
        }
        fetchData()
      },[])
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
                data={listAnimeNewEpisodeReleases}
                keyExtractor={(item: AnimeNewEpisodeReleasesViewModel) => item.Id.toString()}
                renderItem={({ item,index}: { item: AnimeNewEpisodeReleasesViewModel,index:number }) => {
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
        backgroundColor:Color.SecondaryColor
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
        backgroundColor:Color.PrimaryColor,
        left:10,
        top:10,
        width:30,
        borderRadius:5,
        color:Color.SecondaryColor,
        textAlign:"center",
        fontFamily:fontFamily.PrimaryFont,
        fontSize:15
    },
    episodeAnime:{
        position:"absolute",
        bottom:10,
        left:10,
        color:Color.SecondaryColor,
        backgroundColor:Color.PrimaryColor,
        textAlign:"center",
        fontFamily:fontFamily.PrimaryFont,
        borderRadius:5,
        textAlignVertical:'center',
        width:90
    }
})