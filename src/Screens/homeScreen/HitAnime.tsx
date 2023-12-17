import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity, Alert } from "react-native";
//import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthRoutes, AuthScreenNavigationProps } from "../../navigations/AuthNavigator";
import { useNavigation } from '@react-navigation/native'
import { Color } from "../../common/Colors";
import { Loader } from "../../common/component";
import { NavagitonTop } from "../../common/component/index";
import fontFamily from "../../common/FontFamily";
import { AnimeHitViewModel } from "../../ModelView";
import { animeApi } from "../../apiService/AnimeService";
import LoadScreen from "../loadScreens/loadScreens";
const { height, width } = Dimensions.get("window");


const ListAnimeHot = ({ item }: { item: AnimeHitViewModel }) => {
  const [addMyList, setAddMyList] = useState(false);
  const navigation = useNavigation<AuthScreenNavigationProps>();
  return (
    <TouchableOpacity style={styles.containerAnime}
      onPress={() => {
        navigation.navigate(AuthRoutes.AnimeDetails, { animeId: item.Id })
      }}
    >
      <View style={styles.container_image_raiting}>
        <Image source={{ uri: item.Poster }}
          style={styles.image}
        ></Image>
        <Text style={styles.raiting}> {item.Rating.toString()}</Text>
      </View>
      <View style={styles.contentAnime}>
        <Text style={styles.nameAnime}>{item.Title}</Text>
        <Text style={styles.year_contryAnime}>{item.Year.toString()} | {item.Country}</Text>

        <Text style={styles.genreAnime}>Genre: {item.Categories}</Text>
        <TouchableOpacity
          style={[styles.btnAddMylist,
          { backgroundColor: addMyList ? "#fff" : Color.PrimaryColor }]}
          onPress={() => {
            setAddMyList(!addMyList)
          }}>
          <Ionicons name={addMyList ? "checkmark" : "add"} size={20} color={addMyList ? Color.PrimaryColor : "#ffffff"}></Ionicons>
          <Text style={[styles.btnText,
          { color: addMyList ? Color.PrimaryColor : "#ffffff" }
          ]}>My List</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

const HitAnime = () => {
  const navigation = useNavigation<AuthScreenNavigationProps>();
  const [listHitAnime, setListHitAnime] = useState<AnimeHitViewModel[]>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      const resultAnimeHot = await animeApi.getAnimeHot()
      setListHitAnime(resultAnimeHot)
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <LoadScreen
                visible={loading}
                title="Đang tải Anime Hot nhất"
            />
      <NavagitonTop
        title="Top Hits Anime"
        OnPressArrowBack={
          () => {
            navigation.navigate(AuthRoutes.MainNavigationBar);
          }}
        OnPressSearch={() => {
          Alert.alert("search")
        }}
        search={true}
      />
      <FlatList
        data={listHitAnime}
        keyExtractor={(item: any) => item.Id}
        renderItem={({ item }: { item: AnimeHitViewModel }) => {
          return (
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.SecondaryColor
  },

  containerAnime: {
    paddingHorizontal: 20,
    height: height * 0.2,
    marginBottom: 10,
    flexDirection: "row"
  },
  container_image_raiting: {
    position: 'relative',
    width: width * 0.35
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10
  },
  raiting: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: Color.PrimaryColor,
    textAlign: 'center',
    width: 30,
    height: 20,
    color: Color.SecondaryColor,
    borderRadius: 5
  },
  contentAnime: {
    marginHorizontal: 20,
    width: width * 0.6
  },
  nameAnime: {
    fontSize: 20,
    fontWeight: "bold",
    color: Color.Black,
    fontFamily: fontFamily.PrimaryFont
  },
  year_contryAnime: {
    marginVertical: 10,
    fontWeight: '600',
    color: '#424242',
    fontSize: 16
  },
  genreAnime: {
    color: "#424242",
    fontSize: 14,
    fontWeight: '500'
  },
  btnAddMylist: {
    marginTop: 10,
    width: width * 0.25,
    height: height * 0.04,
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