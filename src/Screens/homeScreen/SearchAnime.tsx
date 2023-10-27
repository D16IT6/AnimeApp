import React, { useState } from "react";
import { Text, View, SafeAreaView, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthRoutes, AuthScreenNavigationProps } from "../../navigations/AuthNavigator";
import { useNavigation } from '@react-navigation/native'
import { InputAuthScreen, Loader } from "../../common/component";
import { NavagitonTop } from "../../common/component";
import { listSearch } from "../../utils/data";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Color } from "../../common/Colors";
import { groupIcon } from "../../common/Icons";
import LottieView from "lottie-react-native";
import fontSizes from "../../common/FontSizes";
import fontFamily from "../../common/FontFamily";
const { height, width } = Dimensions.get("window");

type listAnimeProps ={
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
const ListSearchAnime =({item}:{item:listAnimeProps})=>{
return(
    <TouchableOpacity 
    onPress={()=>{`Ban dang xem ${item.name}`}}
    style={styles.containerAnime}
    >
        <Image 
        source={{uri:item.url}}
        style={styles.imageAnime}
        />
        <Text style={styles.nameAnime}>{item.name}</Text>

</TouchableOpacity>)
}
const SearchAnime = () => {
    const [inputSearch, setInputSearch] = useState('')

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
                       navigation.navigate(AuthRoutes.Filter)
                    }}
                >
                    <Image source={groupIcon}></Image>
                </TouchableOpacity>
            </View>
            {listSearch.length != 0 && (
                <FlatList
                    data={listSearch}
                    renderItem={({ item }) => <ListSearchAnime 
                    item={item}
                    ></ListSearchAnime>}
                    keyExtractor={(item) => item.id}
                ></FlatList>
            )


            }
            {listSearch.length == 0 && (
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
        width: width * 0.7,
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
        height:height*0.7,
        justifyContent:"center",
        alignItems:"center",
    },
    AnimationNotFound: {
        width: width * 0.8,
        height: height * 0.4,
    },
    titleNotFound:{
        fontSize:35,
        fontFamily:fontFamily.PrimaryFont,
        fontWeight:'700',
        color:Color.PrimaryColor,
        marginVertical:20
    },
    subTitleNotFound:{
        textAlign:"center",
        fontSize:fontSizes.h4,
        color:"#424242",
        fontWeight:'500',
    },
    containerAnime:{
        flexDirection:'row',
        marginVertical:10
    },
    imageAnime:{
        width:width*0.3,
        height:height*0.2,
        borderRadius:10
    },
    nameAnime:{
        flex:1,
        paddingLeft:30,
        textAlignVertical:'center',
        fontFamily: fontFamily.PrimaryFont,
        fontSize: 18,
        fontWeight:'700',
        color:Color.Black
    }
})