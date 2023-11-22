import React from "react";
import{View ,Text, StyleSheet, ImageBackground,Image, Dimensions, TouchableOpacity,FlatList, ScrollView} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { AuthNavigator, AuthRoutes, AuthScreenNavigationProps } from "../../navigations/AuthNavigator";
import { LoginScreen, ResetWelcome } from "../AuthScreens";
import { useNavigation } from '@react-navigation/native'
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome"
import { SafeAreaView } from "react-native-safe-area-context";
import { Color } from "../../common/Colors";
import { Double } from "react-native/Libraries/Types/CodegenTypes";
import { listHotAnimeData,listNewEpisodeReleases } from "../../utils/data";
import fontFamily from "../../common/FontFamily";
import { logo } from "../../common/Images";
const Tab = createBottomTabNavigator();
const anime = {
    id:1,
    avatar:'../../assets/images/demon_slayder.png',
    title:'Demon Slayer: Kimetsu ',
    category:'Action, Shounen, Martial Arts, Adventure, ...'
}
const {width,height} =Dimensions.get('window')

// const navigation = useNavigation<AuthScreenNavigationProps>();

interface listAnimeProps {
    id:string,
    rating:Double,
    year: number,
    name: string,
    contry: string,
    genre: string,
    urlImage: string,
    urlFilm:string,
    episode:number,
}
const ListAnime= ({item,index}:{item:listAnimeProps,index:number})=>{
    const navigation = useNavigation<AuthScreenNavigationProps>();
    return(
    <TouchableOpacity style={styles.containerAnime}
    onPress={()=>{
         navigation.navigate(AuthRoutes.AnimeDetails,{animeInfo:item})
    }}
    >
        <Image source={{uri:item.urlImage}}
        style={styles.imageAnime}
        />      
    <Text style={styles.ratingAnime}>{item.rating}</Text>
    <Text style={styles.topOrderAnime}>{index+1}</Text>
    </TouchableOpacity>
    
    )
}
const HomeScreen = () =>{
     const navigation = useNavigation<AuthScreenNavigationProps>();
    return(
        <SafeAreaView style={styles.container}>  
                <ImageBackground source={require('../../assets/images/demon_slayder.png')} style={styles.top} >
                    <View style={styles.topheader}>
                        <Image source={logo} style={styles.topLogo} resizeMode="contain"></Image>
                        <View style={styles.topTools}>
                            <Ionicons name="search" color={Color.SecondaryColor} size={25}></Ionicons>
                            <FontAwesomeIcons name="bell" color={Color.SecondaryColor} size={25}
                            onPress={()=>navigation.navigate(AuthRoutes.Notification)}
                            ></FontAwesomeIcons>
                        </View>
                    </View>
                    
                    <View style={styles.topContent}>
                        <Text style={styles.nameAnime}>
                            Demon Slayer: Kimetsu ...
                        </Text>
                        <Text style={styles.categoryAnime}>Action, Shounen, Martial Arts, Adventure, ...</Text>
                        <View style={styles.btn}>
                            <TouchableOpacity style={styles.btnPlay}>
                            <Ionicons name="caret-forward-circle" color={Color.SecondaryColor} size={20}></Ionicons>
                            <Text style={styles.btnText}>Play</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnMylist}>
                                <Ionicons name="add" color={Color.SecondaryColor} size={20}></Ionicons>
                                <Text style={styles.btnText}>My List</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                </ImageBackground>
                
            <ScrollView>
            <View style={styles.hitanime}>
                <View style={styles.toplist}>
                    <Text style={styles.titlelist}>Top Hits Anime</Text>
                <Text style={styles.buttonlist}
                onPress={()=>{navigation.navigate(AuthRoutes.HitAnime)}}
                >See all</Text>
                </View>   
                 <FlatList
                 horizontal={true}
                 data={listHotAnimeData}
                 keyExtractor={(item:any) => item.id}
                 renderItem={({item,index}:{item:listAnimeProps,index:number})=><ListAnime item={item} index={index}/>}
                 />                     
            </View>
            <View style={styles.New_Episode_Releases}>
            <View style={styles.toplist}>
                    <Text style={styles.titlelist}>New Episode Releases</Text>
                <Text style={styles.buttonlist}
                onPress={()=>{navigation.navigate(AuthRoutes.NewEpisodeReleases)}}
                >See all</Text>
                 
            </View>
            
                 <FlatList
                 horizontal={true}
                 data={listNewEpisodeReleases}
                 
                 keyExtractor={(item:any) => item.id}
                 renderItem={({item,index}:{item:listAnimeProps,index:number})=><ListAnime item={item} index={index}/>}
                 />   
            </View>
            </ScrollView>
        </SafeAreaView>
    )

}

export default HomeScreen

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    top:{
        flex:4,        
    },
    topheader:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    topLogo:{
        marginLeft:20,
        marginTop:20,
         width:width*0.1,
         height:height*0.05,
    },
    topTools:{
        flexDirection:'row',
        width:width*0.2,
        justifyContent:"space-around",
        height:height*0.05,
        alignItems:'center',
        marginRight:20,
        marginTop:20
    },
    topContent:{
        paddingLeft:20,
        justifyContent:'flex-end',
        //backgroundColor:'yellow',
        flex:1
    },
    nameAnime:{
        fontSize:24,
        color:Color.SecondaryColor,
        fontWeight:'700',
        fontFamily: fontFamily.PrimaryFont
        
    },
    categoryAnime:{
        fontSize:16,
        color:Color.SecondaryColor,
        fontFamily: fontFamily.PrimaryFont,
        fontWeight:'500'
    },
    btn:{
        flexDirection:'row',
        alignItems:'center',
        height:height*0.07
    },
    btnPlay:{
        backgroundColor:Color.PrimaryColor,
        width:width*0.2,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        height:height*0.04,
        borderRadius:20,
        marginRight:20,
        
    },
    btnMylist:{
        //backgroundColor:PrimaryColor,
        width:width*0.25,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        height:height*0.04,
        borderRadius:20,
        borderWidth:2,
        borderColor:Color.SecondaryColor,
        
    },
    btnText:{
        color:Color.SecondaryColor,
        fontWeight:"600"
    },
    hitanime:{
        paddingLeft:20,
        flex:2.5,
        backgroundColor:Color.SecondaryColor
    },
    toplist:{
        flexDirection:'row',
        alignItems:'center',
        height:height*0.05
    },
    titlelist:{
        flex:1,
        fontSize:18,
        color:Color.Black,
        fontWeight:"700"
    },
    buttonlist:{
        width:width*0.2,
        fontSize:14,
        textAlign:'center',
        fontWeight:"600",
        color:Color.PrimaryColor
    },
    containerAnime:{
        position:'relative',
        height:height*0.2,
        width:width*0.3,
        marginHorizontal:5,

    },
    imageAnime:{
       width:'100%',
       height:'100%',
       borderRadius:10,
    },
    ratingAnime:{
        position:"absolute",
        backgroundColor:Color.PrimaryColor,
        color:Color.SecondaryColor,
        borderRadius:5,
        width:30,
        margin:10,
        textAlign:'center'
    },
    topOrderAnime:{
        position:'absolute',
        bottom:10,
        left:10,
        color:Color.SecondaryColor,
        fontSize:35
    },   
    New_Episode_Releases:{
        flex:2.5,
        paddingLeft:20,
        backgroundColor:Color.SecondaryColor
    },

})