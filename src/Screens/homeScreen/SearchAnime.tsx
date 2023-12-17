import React, { useEffect, useRef, useState } from "react";
import { Text, View, SafeAreaView, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthRoutes, AuthScreenNavigationProps } from "../../navigations/AuthNavigator";
import { useNavigation } from '@react-navigation/native'
import { InputAuthScreen, Loader } from "../../common/component";
import { NavagitonTop } from "../../common/component";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { Color } from "../../common/Colors";
import { groupIcon } from "../../common/Icons";
import LottieView from "lottie-react-native";
import fontSizes from "../../common/FontSizes";
import fontFamily from "../../common/FontFamily";
import { AnimeSearchParams, AnimeSearchRequestViewModel, AnimeSearchResponseViewModel, AttributeProps } from "../../ModelView";
import { SearchAnimeRouteProps } from "../../navigations/AuthNavigator/Type";
import { apiSearch } from "../../apiService/SearchService";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome"
const { height, width } = Dimensions.get("window");


const ListSearchAnime = ({ item }: { item: AnimeSearchResponseViewModel }) => {
    return (
        <TouchableOpacity
            onPress={() => { `Ban dang xem ${item.Title}` }}
            style={styles.containerAnime}
        >
            <Image
                source={{ uri: item.Poster }}
                style={styles.imageAnime}
            />
            <Text style={styles.nameAnime}>{item.Title}</Text>

        </TouchableOpacity>)
}
const ItemSelected = ({ item }: { item: AttributeProps }) => {
    return (
        <View style={styles.BtnAttribute}>
            <Text style={styles.nameAttribute}>{item.Name}</Text>
        </View>)
}
const SearchAnime = ({ route }: { route: SearchAnimeRouteProps }) => {
    const dataSelected: AnimeSearchParams = route.params;
    const [search, setSearch] = useState<AnimeSearchResponseViewModel[]>();
    const [dataArray1, setdataArray1] = useState<AttributeProps[]>();
    const [inputSearch, setInputSearch] = useState("");
    console.log(inputSearch)
    const jsonApi: AnimeSearchRequestViewModel = {
        SearchTitle: inputSearch,
        CountryId: dataSelected?.selectedCountry.find(x => x.Selected)?.Id ?? 0,
        AgeRaitingId: dataSelected?.selectedAgeRaiting.find(x => x.Selected)?.Id ?? 0,
        TypeId: dataSelected?.selectedType.find(x => x.Selected)?.Id ?? 0,
        StatusId: dataSelected?.selectedStatus.find(x => x.Selected)?.Id ?? 0,
        CategoryIds: dataSelected?.selectedCategories?.filter(x => {
            if (x.Selected)
                return x.Id;
        }).map(x => x.Id) ?? []
    }

    const searchTitle = () => {
        const jsonApiTile = (inputSearch: string, jsonApi: AnimeSearchRequestViewModel) => {
            return { ...jsonApi, SearchTitle: inputSearch }
        }
        console.log(inputSearch)
        const fetchData = async () => {
            const result = await apiSearch.getSearch(jsonApiTile(inputSearch, jsonApi))
            setSearch(x => result);
        }
        fetchData();
    }
    useEffect(() => {
        const fetchData = async () => {
            const result = await apiSearch.getSearch(jsonApi)
            setSearch(x => result);
        }
        fetchData();
    }, [dataSelected])

    useEffect(() => {
        if (dataSelected !== undefined) {
            if (dataSelected === null) {
                return;
                // console.log("loi", dataSelected);
            } else {
                const dataArray = [...dataSelected.selectedAgeRaiting,
                ...dataSelected.selectedCountry,
                ...dataSelected.selectedStatus,
                ...dataSelected.selectedType,
                ...dataSelected.selectedCategories
                ];
                setdataArray1(dataArray)

            }
        }
    }, [dataSelected]);
    const navigation = useNavigation<AuthScreenNavigationProps>()
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <InputAuthScreen
                    iconName="search"
                    placeholder="Tìm kiếm"
                    onChangeText={(text) => { setInputSearch(text) }}
                    onFocus={() => { }}
                    style={styles.inputSearch}
                ></InputAuthScreen>
                <TouchableOpacity style={styles.filter}
                    onPress={() => {
                        searchTitle();
                    }}
                >
                    <FontAwesomeIcons name={"search"} size={20} color={Color.PrimaryColor} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.filter}
                    onPress={() => {
                        navigation.navigate(AuthRoutes.Filter)
                    }}
                >
                    <Image source={groupIcon}></Image>
                </TouchableOpacity>
            </View>
            {dataSelected !== undefined && (
                <View style={styles.selected}>
                    <FlatList
                        horizontal={true}
                        data={dataArray1}
                        keyExtractor={(item) => item.Name}
                        renderItem={({ item }) => {
                            return <ItemSelected item={item} />;
                        }}
                    />
                </View>
            )}
            {search && search.length != 0 ? (
                <FlatList
                    data={search}
                    renderItem={({ item }) => <ListSearchAnime
                        item={item}
                    ></ListSearchAnime>}
                    keyExtractor={(item) => item.Id.toString()}
                ></FlatList>
            ) : (
                <View style={styles.containerNotFound}>
                    <LottieView source={require('../../assets/animation/animation_error.json')}
                        style={styles.AnimationNotFound}
                        autoPlay loop
                    ></LottieView>
                    <Text style={styles.titleNotFound}>Không tìm thấy</Text>
                    <Text style={styles.subTitleNotFound}>Xin lỗi, không thể tìm thấy từ khóa bạn đã nhập. Hãy thử kiểm tra lại hoặc tìm kiếm bằng từ khóa khác.</Text>
                </View>
            )
            }

        </SafeAreaView>
    )
}

export default SearchAnime
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: Color.SecondaryColor,
        paddingTop: 20
    },
    headerContainer: {
        flexDirection: "row",
        height: height * 0.07,
        justifyContent: "center",
        alignItems: 'center'
    },
    inputSearch: {
        width: width * 0.6,
    },
    filter: {
        backgroundColor: "rgba(6, 193, 73, 0.08)",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: 'center',
        marginLeft: 20,
        width: width * 0.13,
        height: "80%"
    },
    containerNotFound: {
        height: height * 0.7,
        justifyContent: "center",
        alignItems: "center",
    },
    AnimationNotFound: {
        width: width * 0.8,
        height: height * 0.4,
    },
    titleNotFound: {
        fontSize: 35,
        fontFamily: fontFamily.PrimaryFont,
        fontWeight: '700',
        color: Color.PrimaryColor,
        marginVertical: 20
    },
    subTitleNotFound: {
        textAlign: "center",
        fontSize: fontSizes.h4,
        color: "#424242",
        fontWeight: '500',
    },
    containerAnime: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    imageAnime: {
        width: width * 0.3,
        height: height * 0.2,
        borderRadius: 10
    },
    nameAnime: {
        flex: 1,
        paddingLeft: 30,
        textAlignVertical: 'center',
        fontFamily: fontFamily.PrimaryFont,
        fontSize: 18,
        fontWeight: '700',
        color: Color.Black
    },
    BtnAttribute: {
        borderRadius: 20,
        borderWidth: 2,
        borderColor: Color.PrimaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: Dimensions.get("window").width,
        marginRight: 5,
        backgroundColor: Color.PrimaryColor

    },
    nameAttribute: {
        fontFamily: fontFamily.PrimaryFont,
        fontSize: 16,
        fontWeight: '600',
        fontStyle: 'normal',
        marginHorizontal: 20,

        textAlignVertical: 'center',
        color: Color.SecondaryColor
    },
    selected: {
        marginVertical: 10,
        height: height * 0.05,
    }
})