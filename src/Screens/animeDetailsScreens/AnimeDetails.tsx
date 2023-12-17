import React, { useState, useRef, useEffect } from "react"
import { Alert, Dimensions, FlatList, SafeAreaView, ScrollView, Image, StyleSheet, Text, View, ImageBackground, TouchableOpacity, Animated } from "react-native";
import { Comments } from "../../common/component";
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
import { AnimeDetailRouteProps } from "../../navigations/AuthNavigator/Type";
import { imageError } from "../../utils/httpReponse";
const { width, height } = Dimensions.get("window")


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
const AnimeDetails = ({ route }: AnimeDetailRouteProps) => {
    const {
        animeId
    } = route.params;

    const [animeDetail, setAnimeDetail] = useState<AnimeDetailsViewModel>();
    const [allComment, setAllComment] = useState<CommentResponseView[]>();
    const [listAnimeMoreLikeThis, setListAnimeMoreLikeThis] = useState<AnimeRandomViewModel[]>();
    const [showComments, setShowComment] = useState(false)
    const scrollY = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        return () => {
            scrollY.removeAllListeners();
        };
    }, [scrollY]);

    useEffect(() => {
        const fetchData = async () => {
            const resultAnimeDetail = await animeApi.getAnimeById(animeId)
            setAnimeDetail(x => resultAnimeDetail)
            const resultAllComment = await CommentApi.getAllComment(animeId)
            setAllComment(x => resultAllComment)
            const resultListAnimeRandom = await animeApi.getAnimeRandom();
            setListAnimeMoreLikeThis(x => resultListAnimeRandom)
        }
        fetchData()
    }, [])

    const headerOpacity = scrollY.interpolate({
        inputRange: [0, 100], // Thay đổi dựa trên giá trị cuộn
        outputRange: [1, 0],   // Giá trị opacity tương ứng
        extrapolate: 'clamp',  // Giữ cho giá trị nằm trong khoảng [0, 1]
    });

    const headerHeight = scrollY.interpolate({
        inputRange: [0, 10, 50, 100], // Thay đổi dựa trên giá trị cuộn
        outputRange: [height * 0.5, height * 0.45, height * 0.25, 0],   // Giá trị opacity tương ứng
        extrapolate: 'clamp',
    });

    const navigation = useNavigation<AuthScreenNavigationProps>();
    return <SafeAreaView style={styles.container}>
        <Ionicons name='arrow-back'
            onPress={() => {
                navigation.navigate(AuthRoutes.MainNavigationBar)
            }}
            size={35} color={Color.SecondaryColor}
            style={{ position: 'absolute', zIndex: 10 }}
        />
        <ImageBackground
            source={{ uri: animeDetail?.Poster ?? imageError }}
            style={styles.avartar}
        />
        <View style={{ height: height * 0.7 }}>
            <Animated.View style={{ height: headerHeight, opacity: headerOpacity }}>
                <View style={styles.content}>
                    <Text style={styles.nameAnime}>{animeDetail?.Title}</Text>
                    <View style={styles.contentAnime}>
                        <Text style={styles.starRaiting}>☆ {animeDetail?.Rating === "NaN" ? 0 : animeDetail?.Rating}/5</Text>
                        <Text style={styles.year}>{animeDetail?.Year}</Text>
                        <Text style={styles.ageRaiting}>{animeDetail?.AgeRating}</Text>
                        <Text style={styles.region}>{animeDetail?.Country}</Text>
                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.btnPlay} onPress={() => {
                            Alert.alert('Chức năng chưa phát triển', 'Bấm vào tập bên dưới để xem')
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
                <View style={[styles.episodes]}>
                    <View style={styles.topEpisodes}>
                        <Text style={styles.titleEpisodes}>Tập phim</Text>
                        <View style={{ overflow: 'hidden' }}>
                            {/* <DropdownComponent /> */}
                        </View>
                    </View>
                    {animeDetail?.Episodes?.length || 0 > 0 ? (<FlatList
                        horizontal={true}
                        data={animeDetail?.Episodes}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate(AuthRoutes.VideoPlayScreen, {
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
            </Animated.View>
            <View style={styles.more_comments}>
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
                    <Animated.View style={[styles.more_like_this, { height: height * 0.7 }]}>
                        <FlatList
                            columnWrapperStyle={styles.columnWrapper}
                            onScroll={Animated.event(
                                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                                { useNativeDriver: false }
                            )}
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

                    </Animated.View>
                )
            }
            {
                showComments && (
                    <Animated.View style={{ height: height * 0.7 }}>
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
                                onScroll={Animated.event(
                                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                                    { useNativeDriver: false }
                                )}
                                data={allComment}
                                keyExtractor={(item) => item.Id.toString()}
                                renderItem={({ item }: { item: CommentResponseView, index: number }) => {
                                    return (
                                        <Comments
                                            key={item.Id}
                                            comment={item}
                                        />
                                    )
                                }}
                            />
                        </View>
                    </Animated.View>

                )
            }
        </View>
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
        height: height * 0.05,
        flexDirection: 'row',
        marginHorizontal: 10,
    },
    more_like_this: {
        // flex: 0.35,
        // color:Color.SecondaryColor,
        // zIndex:10

    },
    comments: {
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
        marginTop: 10,
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
        height: height * 0.03,
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
        width: width * 0.4,
        fontFamily: fontFamily.PrimaryFont,
        fontSize: 18,
        fontWeight: "700",
        letterSpacing: 0.2,
        color: Color.Black
    }
})