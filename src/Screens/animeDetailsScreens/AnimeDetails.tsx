import React, { useState, useRef, useEffect, useCallback } from "react"
import { Alert, FlatList, SafeAreaView, ScrollView, Image, StyleSheet, Text, View, ImageBackground, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { BottomSheet, Comments, Raiting } from "../../common/components";
import { useNavigation } from '@react-navigation/native'
import { AuthRoutes, AuthScreenNavigationProps } from "../../navigations/AuthNavigator";
import { Color } from "../../common/Colors";
import Ionicons from "react-native-vector-icons/Ionicons"
import fontFamily from "../../common/FontFamily";
import fontSizes from "../../common/FontSizes";
import AntDesign from "react-native-vector-icons/AntDesign"

import { DowloadIcon } from "../../common/Icons";
import { animeApi } from "../../apiService/AnimeService";
import { AnimeDetailsViewModel, AnimeRandomViewModel, CommentResponseView } from "../../ModelView";
import HTMLView from 'react-native-htmlview';
import LottieView from "lottie-react-native";
import { CommentApi } from "../../apiService/CommentService";
import { imageError } from "../../utils/httpReponse";
import LoadScreen from "../loadScreens/loadScreens";
import { apiMyList } from "../../apiService/MylistService";
import { AnimeDetailRouteProps } from "../../navigations/AuthNavigator/Type";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetRefProps } from "../../common/components/BottomSheet";
import Screen from "../../utils/screenInformation";
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withClamp, withSpring } from "react-native-reanimated";

const ListAnimeMoreLikeThis = ({ item, index }: { item: AnimeRandomViewModel, index: number }) => {
    var check = index % 2 == 0;
    const navigation = useNavigation<AuthScreenNavigationProps>();

    return (
        <TouchableOpacity style={[styles.contentAnimeMore,
        {
            marginLeft: check ? 10 : 0,
            marginRight: check ? 0 : 10
        }
        ]}
            onPress={() => {
                navigation.push(AuthRoutes.AnimeDetails, {
                    animeId: item.Id
                })
            }}
        >
            <Image source={{ uri: item.Poster }}
                style={styles.imageAnimeMore}
            />
            <Text style={styles.ratingAnime}>{item.Rating}</Text>
        </TouchableOpacity>
    )
}

const AnimeDetails = ({ route }: { route: AnimeDetailRouteProps }) => {
    const {
        animeId
    } = route.params;
    const [loading, setLoading] = useState<boolean>(true);
    const [animeDetail, setAnimeDetail] = useState<AnimeDetailsViewModel>();
    const [allComment, setAllComment] = useState<CommentResponseView[]>();
    const [listAnimeMoreLikeThis, setListAnimeMoreLikeThis] = useState<AnimeRandomViewModel[]>();
    const [showComments, setShowComment] = useState(false)
    const MAX_TRANSLATION_Y_RAITING = useRef(-Screen.height / 2.5).current;
    const MAX_TRANSLATION_Y_MORE = Screen.height * 0.5+40; //flatlist+title

    // xu ly binh luan
    const rootComments: CommentResponseView[] = allComment?.filter((comment) => {
        return comment.ParentId === null;
    }) || [];

    const getReplies = (commentId: number) => {
        return (
            allComment?.filter((comment) => comment.ParentId === commentId) || []
        ).sort((a, b) => new Date(a.CreatedDate).getTime() - new Date(b.CreatedDate).getTime());
    };

    useEffect(() => {
        const fetchData = async () => {
            const resultAnimeDetail = await animeApi.getAnimeById(animeId)
            setAnimeDetail(x => resultAnimeDetail)
            const resultAllComment = await CommentApi.getAllComment(animeId)
            setAllComment(x => resultAllComment)
            const resultListAnimeRandom = await animeApi.getAnimeRandom();
            setListAnimeMoreLikeThis(x => resultListAnimeRandom)
            setLoading(false)
        }
        fetchData()
    }, [])


    const AddMylist = async (animeId: number) => {
        try {
            console.log(`animeId${animeId}`)
            const result = await apiMyList.createMyList(animeId)
            console.log(result)
            if (result) {

                const fetchData = async () => {

                    Alert.alert("Thông báo", "Thêm thành công", [
                        {
                            text: "OK",
                            onPress: async () => {
                                setLoading(true);
                                const resultAnimeDetail = await animeApi.getAnimeById(animeId);
                                setAnimeDetail(resultAnimeDetail);
                                setLoading(false);
                            }
                        }
                    ]);
                };

                fetchData();
            } else {
                Alert.alert("Thông báo", "Thêm thất bại")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const navigation = useNavigation<AuthScreenNavigationProps>();
    //xy ly lien raiting
    const refBottomSheet = useRef<BottomSheetRefProps>(null);

    const handlePressRaiting = useCallback(() => {
        refBottomSheet.current?.scrollTo(refBottomSheet.current.isActive() ? 0 : MAX_TRANSLATION_Y_RAITING)
    }, [])
    //xy ly animation lien quan binh luan
    const scrollY = useSharedValue<number>(0);
    const handleScrollY=(event:NativeSyntheticEvent<NativeScrollEvent>)=>{
        // console.log(`bandau:${event.nativeEvent.contentOffset.y}`)
         scrollY.value = Math.min(event.nativeEvent.contentOffset.y,MAX_TRANSLATION_Y_MORE)
        //  console.log(`MAX_TRANSLATION_Y_MORE:${MAX_TRANSLATION_Y_MORE}`);
        //  console.log(`y:${scrollY.value}`);
    }
    const MoreComentStyle = useAnimatedStyle(()=>{
        return {
            transform:[
                {translateY:withSpring(-scrollY.value)}
            ]
        }
    } )//,[scrollY]
    return <SafeAreaView style={styles.container}>
        <GestureHandlerRootView style={styles.container}>
            <LoadScreen
                visible={loading}
                title="Đang tải thông tin anime"
            />
            <Ionicons name='arrow-back'
                onPress={() => {
                    navigation.navigate(AuthRoutes.MainNavigationBar)
                }}
                size={35} color={Color.Black}
                style={{ position: 'absolute', zIndex: 10 }}
            />
            <ImageBackground
                source={{ uri: animeDetail?.Poster ?? imageError }}
                style={styles.avartar}
            />
            <View style={styles.content}>
                <Text style={styles.nameAnime}>{animeDetail?.Title}</Text>
                <View style={styles.contentAnime}>
                    <TouchableOpacity onPress={handlePressRaiting}>
                        <Text style={styles.starRaiting}>☆ {animeDetail?.Rating}/5</Text>
                    </TouchableOpacity>
                    <Text style={styles.year}>{animeDetail?.Year}</Text>
                    <Text style={styles.ageRaiting}>{animeDetail?.AgeRating}</Text>
                    <Text style={styles.region}>{animeDetail?.Country}</Text>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.btnPlay} onPress={() => {
                        animeDetail?.Episodes?.length || 0 > 0
                            ? navigation.navigate(AuthRoutes.VideoPlayScreen, {
                                animeId: animeId,
                                url: animeDetail?.Episodes[0].Url,
                                name: `${animeDetail?.Title}(Tập ${animeDetail?.Episodes[0].Title})`
                            })
                            : Alert.alert(`Phim ${animeDetail?.Title} chưa có tập nào`);
                    }}>
                        <AntDesign name="play" color={Color.SecondaryColor} size={20}></AntDesign>
                        <Text style={styles.txtPlay}>Play</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnDowload} onPress={() => {
                        Alert.alert('Chức năng chưa phát triển', 'Liên hệ admin để download :))')
                    }}>
                        <Image source={DowloadIcon}
                        ></Image>
                        <Text style={styles.txtDowload} >Dowload</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.btnAddMylist,
                        { backgroundColor: animeDetail?.IsFavorite ? "#fff" : Color.PrimaryColor }]}
                        onPress={() => {
                            if (!animeDetail?.IsFavorite) {
                                AddMylist(animeId)
                            }
                        }}>
                        <Ionicons name={animeDetail?.IsFavorite ? "checkmark" : "add"} size={20} color={animeDetail?.IsFavorite ? Color.PrimaryColor : "#ffffff"}></Ionicons>
                        <Text style={[styles.btnText,
                        { color: animeDetail?.IsFavorite ? Color.PrimaryColor : "#ffffff" }
                        ]}>My List</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container_genre_describe}>
                    <Text style={styles.genre}>Genre: {animeDetail?.Categories.join(",")}</Text>
                    <ScrollView >
                        {animeDetail?.Synopsis && (
                            <HTMLView
                                value={animeDetail.Synopsis.toString()} // Safe to access .toString() because you've checked for undefined
                                stylesheet={StyleSheet.create({
                                    p: {
                                        fontFamily: fontFamily.PrimaryFont,
                                        fontSize: 14,
                                        fontWeight: "500",
                                        letterSpacing: 0.2,
                                        color: Color.Black
                                    }
                                })}
                            />
                        )}
                    </ScrollView>
                </View>
            </View>
            <View style={styles.episodes}>
                <View style={styles.topEpisodes}>
                    <Text style={styles.titleEpisodes}>Tập phim</Text>
                </View>
                {animeDetail?.Episodes?.length || 0 > 0 ? (<FlatList
                    horizontal={true}
                    data={animeDetail?.Episodes}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                navigation.navigate(AuthRoutes.VideoPlayScreen, {
                                    animeId: animeId,
                                    url: item.Url,
                                    name: `${animeDetail?.Title}(Tập ${item.Title})`
                                })
                            }}
                                style={styles.containerAnime}
                            >
                                <Image source={{ uri: animeDetail?.Poster }}
                                    style={styles.imageAnime}
                                />
                                <AntDesign name="play" color={Color.SecondaryColor} size={20}
                                    style={styles.iconPlay}
                                ></AntDesign>
                                <Text style={styles.textEpisode}>Tập {item.Title}</Text>
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor={(item) => item.Id.toString()}
                />)
                    : (<View style={styles.EpisodeNull}>
                        <LottieView source={require('../../assets/animation/animation_error.json')}
                            style={{ width: 100, height: 100 }}
                            autoPlay loop
                        ></LottieView>
                        <Text style={styles.TitleNull}>{`${animeDetail?.Title} chưa có tập nào`}</Text>
                    </View>)

                }
            </View>
            <View style={styles.bookSeats}></View>
            <Animated.View style={[styles.more_comments,MoreComentStyle]}>
                <View style={styles.btnMore_comments}>
                    <TouchableOpacity
                        onPress={() => { setShowComment(false) }}
                        style={[styles.btnMore, { borderColor: showComments ? "#9E9E9E" : Color.PrimaryColor }]}>
                        <Text style={[styles.titleMore, { color: showComments ? "#9E9E9E" : Color.PrimaryColor }]}>Liên quan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { setShowComment(true) }}
                        style={[styles.btnComments, { borderColor: showComments ? Color.PrimaryColor : "#9E9E9E" }]}>
                        <Text style={[styles.titleComments, { color: showComments ? Color.PrimaryColor : "#9E9E9E" }]}>Bình luận</Text>
                    </TouchableOpacity>
                </View>
                {
                    !showComments && (
                        <View style={styles.more_like_this}>
                            <FlatList
                                columnWrapperStyle={styles.columnWrapper}
                                onScroll={handleScrollY}
                                horizontal={false}
                                numColumns={2}
                                data={listAnimeMoreLikeThis}
                                keyExtractor={(item) => item.Id.toString()}
                                renderItem={({ item, index }: { item: AnimeRandomViewModel, index: number }) => {
                                    return (
                                        <ListAnimeMoreLikeThis
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
                                    <Text style={styles.quantityComment}>{allComment?.length} bình luận</Text>
                                    <Text style={styles.seeAll}
                                        onPress={() => {
                                            navigation.navigate(AuthRoutes.CommentsScreens, { animeId: animeId })
                                        }}
                                    >Xem tất cả</Text>
                                </View>
                                <FlatList
                                    onScroll={handleScrollY}
                                    data={rootComments}
                                    keyExtractor={(item) => item.Id.toString()}
                                    renderItem={({ item }: { item: CommentResponseView, index: number }) => {
                                        return (
                                            <Comments
                                                key={item.Id}
                                                comment={item}
                                                replies={getReplies(item.Id)}
                                            />
                                        )
                                    }}
                                />
                            </View>
                     

                    )
                }
            </Animated.View>
            <BottomSheet
                ref={refBottomSheet}
                maxTranslationY={MAX_TRANSLATION_Y_RAITING}
                totalRaiting={animeDetail?.Rating}
            >
                {(totalRaiting, scrollTo) => (
                    <Raiting
                        totalRaiting={totalRaiting}
                        scrollTo={scrollTo}
                    />
                )}
            </BottomSheet>
        </GestureHandlerRootView>
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
        height: Screen.height * 0.3
    },
    content: {
        height: Screen.height * 0.3,
        paddingHorizontal: 10,
        paddingTop: 10,
        backgroundColor: Color.SecondaryColor
    },
    episodes: {
        height: Screen.height * 0.2,
    },
    more_comments: {
        position: 'absolute',
        top: Screen.height * 0.8,
        width:Screen.width,
        backgroundColor:Color.SecondaryColor
    },
    btnMore_comments:{
        height:40,
        flexDirection: 'row',
        marginHorizontal: 10,
        zIndex:5
    },
    bookSeats: {
        height: Screen.height * 0.2,
    },
    more_like_this: {
        height: Screen.height * 0.7,
    },
    comments: {
        height: Screen.height * 0.7,
    },
    topEpisodes: {
        flexDirection: "row",
        alignItems: 'center',
    },
    titleEpisodes: {
        color: Color.Black,
        fontFamily: fontFamily.PrimaryFont,
        fontSize: 24,
        fontWeight: '700',
        marginTop: 10,
        marginBottom: 10,
        flex: 1
    },
    containerAnime: {
        position: 'relative',
        width: Screen.width * 0.3,
        height: Screen.width * 0.25,
        marginRight: 10,
        backgroundColor: Color.SecondaryColor,
    },
    imageAnime: {
        width: Screen.width * 0.3,
        height: Screen.width * 0.25,
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
        backgroundColor: Color.PrimaryColor,
        position: "absolute",
        left: 10,
        bottom: 10,
        fontFamily: fontFamily.PrimaryFont,
        fontSize: 12,
        fontWeight: '500',
        color: Color.SecondaryColor,
        padding: 5,
        borderRadius: 10
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
        width: Screen.width * 0.3,
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
        width: Screen.width * 0.3,
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
        width: Screen.width * 0.4,
        height: Screen.height * 0.25,
    },
    quantityComment: {
        flex: 1,
        fontFamily: fontFamily.PrimaryFont,
        fontSize: 18,
        fontWeight: "700",
        letterSpacing: 0.2,
        color: Color.Black
    },
    contentComments: {
        flexDirection: 'row',
        backgroundColor: 'red',
        height: 60,
        alignItems: 'center',
        paddingHorizontal: 10
    },
    seeAll: {
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
        height: Screen.height * 0.03,
        alignItems: 'center',
        paddingHorizontal: 10
    },
    EpisodeNull: {
        justifyContent: 'center',
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1
    },
    TitleNull: {
        width: Screen.width * 0.4,
        fontFamily: fontFamily.PrimaryFont,
        fontSize: 18,
        fontWeight: "700",
        letterSpacing: 0.2,
        color: Color.Black
    },
    btnAddMylist: {
        width: Screen.width * 0.3,
        height: 40,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        borderRadius: 20,
        borderColor: Color.PrimaryColor,
        borderWidth: 2
    },
    btnText: {
        fontWeight: '600',
        fontSize: 16,
        fontFamily: fontFamily.PrimaryFont
    }
})