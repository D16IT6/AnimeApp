import React, { useState } from "react"
import { Alert, Dimensions, FlatList, SafeAreaView, ScrollView, Image, StyleSheet, Text, View, ImageBackground, TouchableOpacity } from "react-native";
import { ButtonAuthScreen, DropdownComponent, NavagitonTop, SelectorAttribtute } from "../../common/component";
import { useNavigation } from '@react-navigation/native'
import { AuthRoutes, AuthScreenNavigationProps } from "../../navigations/AuthNavigator";
import { Color } from "../../common/Colors";
import { listCategories, listHotAnimeData, listNewEpisodeReleases, listSort } from "../../utils/data";
import Ionicons from "react-native-vector-icons/Ionicons"
import fontFamily from "../../common/FontFamily";
import fontSizes from "../../common/FontSizes";
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { color } from "react-native-elements/dist/helpers";
import { DowloadIcon } from "../../common/Icons";
import { Icon } from "react-native-elements";
const { width, height } = Dimensions.get("window")

interface listAnimeProps {
    id: string,
    name: string,
    year: Number,
    contry: string,
    genre: string,
    urlImage: string,
    urlFilm:string,
    rating: Number,
    episode: Number,
}
const getItem = (item: any) => {
    Alert.alert(`Ban dang xem ${item.id} va${item.name}`)
}
const ListNewEpisodeReleases = ({ item, index }: { item: listAnimeProps, index: number }) => {
    var check = index % 2 == 0;
    return (
        <TouchableOpacity style={[styles.contentAnimeMore,
        {
            marginLeft: check ? 10 : 0,
            marginRight: check ? 0 : 10
        }
        ]}
            onPress={() => getItem(item)}
        >
            <Image source={{ uri: item.urlImage }}
                style={styles.imageAnimeMore}
            ></Image>
            <Text style={styles.ratingAnime}>{item.rating.toString()}</Text>
            <Text style={styles.episodeAnime}>episode {item.episode.toString()}</Text>

        </TouchableOpacity>
    )
}
const AnimeDetails = ({route}:any) => {
    const{
        animeInfo,
    }=route.params;

    // const animeInfo=JSON.stringify(item)
    // const parsedAnimeInfo = JSON.parse(animeInfo);
    // console.log("id la"+parsedAnimeInfo.urlFilm)
    const navigation = useNavigation<AuthScreenNavigationProps>();
    const [showComments, setShowComment] = useState(false)
    return <SafeAreaView style={styles.container}>
        <Ionicons name='arrow-back'
            onPress={() => {
                navigation.navigate(AuthRoutes.MainNavigationBar)
            }}
            size={35} color={Color.SecondaryColor}
            style={{ position: 'absolute', zIndex: 10 }}
        />
        <ImageBackground
            source={{ uri: animeInfo.urlImage }}
            style={styles.avartar}
        />
        <View style={styles.content}>
            <Text style={styles.nameAnime}>{animeInfo.name}</Text>
            <View style={styles.contentAnime}>
                <Text style={styles.starRaiting}>☆ 9.8</Text>
                <Text style={styles.year}>2020</Text>
                <Text style={styles.ageRaiting}>13+</Text>
                <Text style={styles.region}>Japan</Text>
                
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.btnPlay} onPress={()=>{
                    navigation.navigate(AuthRoutes.VideoPlayScreen,{animeInfo:animeInfo})
                }}>
                    <AntDesign name="play" color={Color.SecondaryColor} size={20}></AntDesign>
                    <Text style={styles.txtPlay}>Play</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnDowload}>
                    <Image source={DowloadIcon}
                    ></Image>
                    <Text style={styles.txtDowload} >Dowload</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container_genre_describe}>
                <Text style={styles.genre}>Genre: Action, Martial Arts, Adventure, Dark Fantasy, Thriller, ...</Text>
                <Text style={styles.describe}>Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit, sed do. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat... <Text style={{ color: Color.PrimaryColor }}>View More</Text></Text>
            </View>
        </View>
        <View style={styles.episodes}>
            <View style={styles.topEpisodes}>
                <Text style={styles.titleEpisodes}>Episodes</Text>
                <DropdownComponent />
            </View>
            <FlatList
                horizontal={true}
                data={listHotAnimeData}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => {
                            Alert.alert(`Ban dang xem ${item.name} va ${item.id}`)
                        }}
                            style={styles.containerAnime}
                        >
                            <Image source={{ uri: item.urlImage }}
                                style={styles.imageAnime}
                            />
                            <AntDesign name="play" color={Color.SecondaryColor} size={20}
                                style={styles.iconPlay}
                            ></AntDesign>
                            <Text style={styles.textEpisode}>Episode{item.episode}</Text>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={(item) => item.id}
            ></FlatList>
        </View>
        <View style={styles.more_comments}>
            <TouchableOpacity
                onPress={() => { setShowComment(false) }}
                style={[styles.btnMore, { borderColor: showComments ? "#9E9E9E" : Color.PrimaryColor }]}>
                <Text style={[styles.titleMore, { color: showComments ? "#9E9E9E" : Color.PrimaryColor }]}>More Like This</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { setShowComment(true) }}
                style={[styles.btnComments, { borderColor: showComments ? Color.PrimaryColor : "#9E9E9E" }]}>
                <Text style={[styles.titleComments, { color: showComments ? Color.PrimaryColor : "#9E9E9E" }]}>Comments (29.5K)</Text>
            </TouchableOpacity>
        </View>
        {
            !showComments && (
                <View style={styles.more_like_this}>
                    <FlatList
                        columnWrapperStyle={styles.columnWrapper}
                        horizontal={false}
                        numColumns={2}
                        data={listNewEpisodeReleases}
                        keyExtractor={(item: any) => item.id}
                        renderItem={({ item, index }: { item: listAnimeProps, index: number }) => {
                            return (
                                <ListNewEpisodeReleases
                                    item={item}
                                    index={index}
                                />
                            )
                        }}
                    />

                </View>
            )
        }
        {
            showComments && (
                <View style={styles.comments}>
                    <View style={styles.headerComments}>
                        <Text style={styles.quantityComment}>29.5K Comments</Text>
                        <Text style={styles.seeAll}
                        onPress={()=>{
                            navigation.navigate(AuthRoutes.CommentsScreens)
                        }}
                        >See all</Text>
                    </View>
                     <ScrollView>
                   </ScrollView>


             </View>
            )
        }
    </SafeAreaView>
}

export default AnimeDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.SecondaryColor
    },
    avartar: {
        width: "100%",
        resizeMode: "contain",
        flex: 1
    },
    content: {
        flex: 0.8,
        paddingHorizontal: 10,
        paddingTop: 10,
        backgroundColor: Color.SecondaryColor
    },
    episodes: {
        flex: 0.5,
    },
    more_comments: {
        flex: 0.15,
        flexDirection: 'row',
        marginHorizontal: 10
    },
    more_like_this: {
        flex: 0.35,
    },
    comments: {
        flex: 0.35,
    },
    topEpisodes: {
        flexDirection: "row",
        paddingLeft: 10,
        backgroundColor: Color.SecondaryColor,
        alignItems: 'center'
    },
    titleEpisodes: {
        color: Color.Black,
        fontFamily: fontFamily.PrimaryFont,
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 10,
        flex: 1
    },
    containerAnime: {
        position: 'relative',
        width: width * 0.3,
        height: width * 0.25,
        marginRight: 10,
        backgroundColor: Color.SecondaryColor,
    },
    imageAnime: {
        width: width * 0.3,
        height: width * 0.25,
        borderRadius: 10,
        // marginRight:10,
        resizeMode: "contain",
    },
    iconPlay: {
        position: 'absolute',
        left: "45%",
        top: "45%",
    },
    textEpisode: {
        position: "absolute",
        left: 10,
        bottom: 10,
        fontFamily: fontFamily.PrimaryFont,
        fontSize: 12,
        fontWeight: '500',
        color: Color.SecondaryColor,
    },
    nameAnime: {
        fontFamily: fontFamily.PrimaryFont,
        fontSize: 24,
        fontWeight: '700',
        color: Color.Black,
        marginBottom: 10
    },
    contentAnime: {
        flexDirection: "row",
        alignItems: 'center',
    },
    starRaiting: {
        color: Color.PrimaryColor,
        fontSize: fontSizes.h4,
        fontWeight: "500",
        fontFamily: fontFamily.PrimaryFont,
        marginRight: 20
    },
    year: {
        color: Color.Black,
        fontSize: fontSizes.h4,
        fontWeight: "500",
        fontFamily: fontFamily.PrimaryFont,
        marginRight: 20
    },
    ageRaiting: {
        marginRight: 20,
        fontSize: fontSizes.h4,
        fontFamily: fontFamily.PrimaryFont,
        backgroundColor: Color.SecondaryColor,
        borderColor: Color.PrimaryColor,
        borderWidth: 2,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 6,
        color: Color.PrimaryColor,
        paddingHorizontal: 5,
        paddingVertical: 2
    },
    region: {
        marginRight: 20,
        fontSize: fontSizes.h4,
        fontFamily: fontFamily.PrimaryFont,
        backgroundColor: Color.SecondaryColor,
        borderColor: Color.PrimaryColor,
        borderWidth: 2,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 6,
        color: Color.PrimaryColor,
        paddingHorizontal: 10,
        paddingVertical: 2
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: "space-around",
        marginVertical: 10
    },
    btnPlay: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.4,
        backgroundColor: Color.PrimaryColor,
        height: 40,
        borderRadius: 30
    },
    txtPlay: {
        fontFamily: fontFamily.PrimaryFont,
        fontSize: 16,
        fontWeight: "600",
        letterSpacing: 0.2,
        marginLeft: 10,
        color: Color.SecondaryColor
    },
    txtDowload: {
        fontFamily: fontFamily.PrimaryFont,
        fontSize: 16,
        fontWeight: "600",
        letterSpacing: 0.2,
        marginLeft: 10,
        color: Color.PrimaryColor
    },
    btnDowload: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.4,
        backgroundColor: Color.SecondaryColor,
        borderWidth: 2,
        borderColor: Color.PrimaryColor,
        height: 40,
        borderRadius: 30
    },
    container_genre_describe: {
        flex: 1
    },
    genre: {
        fontFamily: fontFamily.PrimaryFont,
        fontSize: 14,
        fontWeight: "500",
        letterSpacing: 0.2,
        color: Color.Black
    },
    describe: {
        fontFamily: fontFamily.PrimaryFont,
        fontSize: 14,
        fontWeight: "500",
        letterSpacing: 0.2,
        color: Color.Black
    },
    btnMore: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 4,
        borderColor: Color.PrimaryColor
    },
    btnComments: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 4,
        borderColor: Color.PrimaryColor
    },
    titleMore: {
        fontFamily: fontFamily.PrimaryFont,
        fontSize: 16,
        fontWeight: "600",
        letterSpacing: 0.2,
        color: "#9E9E9E"
    },
    titleComments: {
        fontFamily: fontFamily.PrimaryFont,
        fontSize: 16,
        fontWeight: "600",
        letterSpacing: 0.2,
        color: "#9E9E9E"
    },
    ratingAnime: {
        position: "absolute",
        backgroundColor: Color.PrimaryColor,
        left: 10,
        top: 10,
        width: 30,
        borderRadius: 5,
        color: Color.SecondaryColor,
        textAlign: "center",
        fontFamily: fontFamily.PrimaryFont,
        fontSize: 15
    },
    episodeAnime: {
        position: "absolute",
        bottom: 10,
        left: 10,
        color: Color.SecondaryColor,
        backgroundColor: Color.PrimaryColor,
        textAlign: "center",
        fontFamily: fontFamily.PrimaryFont,
        borderRadius: 5,
        textAlignVertical: 'center',
        width: 90
    },
    columnWrapper: {
        justifyContent: 'space-evenly',
        marginTop: 10
    },
    imageAnimeMore: {
        width: "100%",
        height: "100%",
        borderRadius: 15
    },
    contentAnimeMore: {
        position: "relative",
        width: width * 0.4,
        height: height * 0.25,
    },
    quantityComment: {
        flex:1,
        fontFamily: fontFamily.PrimaryFont,
        fontSize: 18,
        fontWeight: "700",
        letterSpacing: 0.2,
        color: Color.Black
    },
    contentComments: {
        flexDirection:'row',
        backgroundColor:'red',
        height:60,
        alignItems:'center',
        paddingHorizontal:10
    },
    // backGroundUser: {
    //     width:45,
    //     height:45,
    //     borderRadius:50
    // },
    // nameUser:{
    //     marginLeft:20,
    //     fontFamily: fontFamily.PrimaryFont,
    //     fontSize: 20,
    //     fontWeight: "700",
    //     letterSpacing: 0.2,
    //     color: Color.Black,
    //     backgroundColor:"yellow",
    //     flex:1
    // },
    seeAll:{
        fontFamily: fontFamily.PrimaryFont,
        fontSize: 14,
        fontWeight: "600",
        letterSpacing: 0.2,
        color: Color.PrimaryColor
    },
    textComments: {

    },
    headerComments: {
        flexDirection: "row",
        height:height*0.03,
        alignItems:'center',
        paddingHorizontal:10
    }
})