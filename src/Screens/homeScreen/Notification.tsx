import React, { useState } from "react";
import { Text, View, SafeAreaView, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthRoutes, AuthScreenNavigationProps } from "../../navigations/AuthNavigator";
import { useNavigation } from '@react-navigation/native'
import { Color } from "../../common/Colors";
import { Loader } from "../../common/components";
import { NavagitonTop } from "../../common/components";
import fontFamily from "../../common/FontFamily";

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
  notification_period:string
}
const listNotification = [
  {
    id: '1',
    name: 'Attack on Titan Final Season Part 2',
    year: 2022,
    contry: 'Japan',
    genre: 'Action fiction, Dark fantasy, Apocalyptic, Drama, Shōnen, ...',
    url: 'https://imgur-com.cdn.ampproject.org/i/imgur.com/nZu9ClH.jpg',
    rating: 9.7,
    episode: 10,
    notification_period:"22/10/2023"
  },
  {
    id: '2',
    name: 'Attack on Titan Final Season Part 2',
    year: 2022,
    contry: 'Japan',
    genre: 'Action fiction, Dark fantasy, Apocalyptic, Drama, Shōnen, ...',
    url: 'https://imgur-com.cdn.ampproject.org/i/imgur.com/4sutpRK.jpg',
    rating: 9.6,
    episode: 10,
    notification_period:"22/10/2023"
  },
  {
    id: '3',
    name: 'Attack on Titan Final Season Part 2',
    year: 2022,
    contry: 'Japan',
    genre: 'Genre: Action fiction, Dark fantasy, Apocalyptic, Drama, Shōnen, ...',
    url: 'http://172.234.73.7/Uploads/Images/ao1.jpg',
    rating: 9.1,
    episode: 10,
    notification_period:"22/10/2023"
  },
  {
    id: '4',
    name: 'Attack on Titan Final Season Part 2',
    year: 2022,
    contry: 'Japan',
    genre: 'Genre: Action fiction, Dark fantasy, Apocalyptic, Drama, Shōnen, ...',
    url: 'http://172.234.73.7/Uploads/Images/ao1.jpg',
    rating: 9.0,
    episode: 10,
    notification_period:"22/10/2023"
  },
  {
    id: '5',
    name: 'Attack on Titan Final Season Part 2',
    year: 2022,
    contry: 'Japan',
    genre: 'Genre: Action fiction, Dark fantasy, Apocalyptic, Drama, Shōnen, ...',
    url: 'http://172.234.73.7/Uploads/Images/ao1.jpg',
    rating: 9.8,
    episode: 10,
    notification_period:"22/10/2023"
  },
  {
    id: '6',
    year: 2022,
    name: 'Attack on Titan Final Season Part 1',
    contry: 'Japan',
    genre: 'Action fiction, Dark fantasy, Apocalyptic, Drama, Shōnen, ...',
    url: 'http://172.234.73.7/Uploads/Images/ao1.jpg',
    rating: 9.8,
    episode:10,
    notification_period:"22/10/2023"
  },
  {
    id: '7',
    year: 2022,
    name: 'Attack on Titan Final Season Part 1',
    contry: 'Japan',
    genre: 'Action fiction, Dark fantasy, Apocalyptic, Drama, Shōnen, ...',
    url: 'http://172.234.73.7/Uploads/Images/ao1.jpg',
    rating: 9.8,
    episode:10,
    notification_period:"22/10/2023"
  },
  {
    id: '8',
    year: 2022,
    name: 'Attack on Titan Final Season Part 1',
    contry: 'Japan',
    genre: 'Action fiction, Dark fantasy, Apocalyptic, Drama, Shōnen, ...',
    url: 'http://172.234.73.7/Uploads/Images/ao1.jpg',
    rating: 9.8,
    episode:10,
    notification_period:"22/10/2023"
  },
  {
    id: '9',
    year: 2022,
    name: 'Attack on Titan Final Season Part 1',
    contry: 'Japan',
    genre: 'Action fiction, Dark fantasy, Apocalyptic, Drama, Shōnen, ...',
    url: 'http://172.234.73.7/Uploads/Images/ao1.jpg',
    rating: 9.8,
    episode:10,
    notification_period:"22/10/2023"
  },
];
const getItem = (item: any) => {
  Alert.alert(`Ban dang xem ${item.id} va${item.name}`)
}
const ListAnimeHot = ({ item }: { item: listAnimeProps }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  return (
    <TouchableOpacity style={styles.containerAnime}
      onPress={() => {
        getItem(item)
      }}
    >
      <View style={styles.container_image_raiting}>
        <Image source={{ uri: item.url }}
          style={styles.image}
        ></Image>
        <Text style={styles.raiting}> {item.rating.toString()}</Text>
      </View>
      <View style={styles.contentAnime}>
        <Text style={styles.nameAnime}>{item.name}</Text>
        <Text style={styles.episodes}>Episodes {item.episode.toString()} </Text>
        <TouchableOpacity
          style={styles.btnUpdate}
          onPress={() => {}}>
          <Text style={styles.btnText}>Update</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container_notification_period}>
          <Text style={styles.notification_period}>{item.notification_period}</Text>
      </View>
    </TouchableOpacity>
  )
}

const Notification = () => {
  const navigation = useNavigation<AuthScreenNavigationProps>();
  return (
    <SafeAreaView style={styles.container}>
      <NavagitonTop
        title="Notification"
        OnPressArrowBack={
          () => {
            navigation.navigate(AuthRoutes.MainNavigationBar);
          }}
        OnPressGroup={() => {
          Alert.alert("group")
        }}
        group={true}
      />
      <FlatList
        data={listNotification}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: { item: listAnimeProps }) => {
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

export default Notification

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.SecondaryColor
  },

  containerAnime: {
    paddingLeft: 20,
    height: height * 0.2,
    marginBottom: 10,
    flexDirection: "row",
  },
  container_image_raiting: {
    position: 'relative',
    width: width * 0.35,
    

  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: "stretch"
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
    marginLeft: 20,
    flex:1
  },
  nameAnime: {
    fontSize: 18,
    fontWeight: "bold",
    color:Color.Black,
    fontFamily: fontFamily.PrimaryFont
  },
  episodes: {
    color: "#424242",
    fontSize: 14,
    fontFamily: fontFamily.PrimaryFont
  },
  btnUpdate: {
    marginTop: 10,
    width: width * 0.25,
    height: height * 0.04,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    borderRadius: 10,
  
    backgroundColor:"rgba(6, 193, 73, 0.2)"
  },
  btnText: {
    fontWeight: '600',
    fontSize: 16,
    fontFamily: fontFamily.PrimaryFont,
    color:Color.PrimaryColor
  },
  container_notification_period:{
  width:width*0.20,
    alignItems:'center',
    height:"20%",
    justifyContent:"center"
  },
  notification_period:{
   fontSize:12,
   color:'#616161',
  }
})