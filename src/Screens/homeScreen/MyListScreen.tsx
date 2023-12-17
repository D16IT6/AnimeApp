import React, { useEffect, useState } from 'react';
import { View, TextInput, Animated, StyleSheet, SafeAreaView, FlatList, Dimensions } from 'react-native';
import { Color } from '../../common/Colors';
import { MyListAnime } from '../../common/component/RenderFlastList';
import { MyListResponseViewModel } from '../../ModelView';
import { apiMyList } from '../../apiService/MylistService';
import getUserIdFromToken from '../../utils/getUserId';
import { Image, Text } from 'react-native-elements';
import { logo, mylistEmpty } from '../../common/Images';
import fontFamily from '../../common/FontFamily';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import LoadScreen from '../loadScreens/loadScreens';

const { width, height } = Dimensions.get("window")



const MyListScreen = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [myList, setMyList] = useState<MyListResponseViewModel[]>();
  console.log(myList)
  const ResetData= () =>{
    const fetData = async () => {
      try {
        const resultMyList = await apiMyList.getMyList()
        setMyList(x => resultMyList)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetData()
  }
  useEffect(() => {
    const fetData = async () => {
      try {
        const resultMyList = await apiMyList.getMyList()
        setMyList(x => resultMyList)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetData()
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <LoadScreen
        visible={loading}
        title="Đang tải danh sách yêu thích"
      />
      <View style={styles.header}>
        <Image source={logo} style={styles.logoImage}></Image>
        <Text style={styles.title}>My List</Text>
      </View>
      {myList && myList?.length <= 0 ? (<View style={styles.containerEmpty}>
        <Image source={mylistEmpty} style={styles.mylistEmptyImage}></Image>
        <Text style={styles.titleMyListEmpty}>Danh sách của bạn trống</Text>
        <Text style={styles.contentMyListEmpty}>Có vẻ như bạn chưa thêm bất kỳ anime nào vào danh sách</Text>
      </View>)
        : (<FlatList
          data={myList}
          keyExtractor={(item) => item.Id.toString()}
          renderItem={({ item }) => {
            return <MyListAnime 
            item={item}
            ResetData={ResetData}
            ></MyListAnime>
          }}
        >
        </FlatList>)
      }

    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Color.SecondaryColor,
    paddingTop: 20
  },
  header: {
    height: height * 0.05,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  containerEmpty: {
    backgroundColor: Color.SecondaryColor,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logoImage: {
    width: width * 0.1,
    height: width * 0.1
  },
  title: {
    flex: 1,
    textAlignVertical: "center",
    height: "100%",
    color: Color.Black,
    fontFamily: fontFamily.PrimaryFont,
    fontSize: 24,
    fontWeight: "700",
    paddingHorizontal: 20
  },
  mylistEmptyImage: {
    width: width * 0.7,
    height: height * 0.3,
    resizeMode: "contain",
  },
  titleMyListEmpty: {
    color: Color.PrimaryColor,
    fontFamily: fontFamily.PrimaryFont,
    fontSize: 24,
    fontWeight: "700",
    marginVertical: 20,
  },
  contentMyListEmpty: {
    color: Color.Gray,
    fontFamily: fontFamily.PrimaryFont,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center"
  }
});


export default MyListScreen