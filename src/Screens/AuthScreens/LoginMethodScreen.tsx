import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, Image ,Alert} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { AuthScreenNavigationProps, AuthRoutes, AuthNavigator } from "../../navigations/AuthNavigator";
import { appleIcon, facebookIcon, googleIcon } from '../../common/Icons';
import LottieView from 'lottie-react-native';
import { PrimaryColor } from '../../common/Colors';
import { LineAuthScreen ,ButtonAuthScreen,LinkAuthScreen } from '../../common/component';
const { width, height } = Dimensions.get('window')
export default function LoginMethodScreen() {
  const navigation = useNavigation<AuthScreenNavigationProps>();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header} >
        <LottieView source={require('../../assets/animation/animation_loginmethod.json')} style={styles.animation} autoPlay loop></LottieView>
        <Text style={styles.title}>
          Cho phép bạn vào
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonMethodLogin} onPress={()=>{Alert.alert("Dang nhap bang facebook")}}>
          <Image source={facebookIcon} style={styles.iconeMethodLogin} />
          <Text style={styles.textMethodLogin}>Tiếp tục với Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonMethodLogin} onPress={()=>{Alert.alert("Dang nhap bang google")}}>
          <Image source={googleIcon} style={styles.iconeMethodLogin} />
          <Text style={styles.textMethodLogin}>Tiếp tục với Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonMethodLogin} onPress={()=>{Alert.alert("Dang nhap bang ")}}>
          <Image source={appleIcon} style={styles.iconeMethodLogin} />
          <Text style={styles.textMethodLogin}>Tiếp tục với Apple</Text>
        </TouchableOpacity>
        <LineAuthScreen
          title="or"
        />
      </View >
      <View style={styles.footer}>
        <ButtonAuthScreen 
        title ="Đăng nhập bằng tài khoản"
        onPress={()=>{
          navigation.navigate(AuthRoutes.SignUp)
        }
        }
        >

        </ButtonAuthScreen>      
        <LinkAuthScreen 
          title="Bạn có muốn tạo tài khoản? "
          onPress={()=>{
            navigation.navigate(AuthRoutes.SignUp)
          }}
          textlink="Đăng ký"     
          ></LinkAuthScreen>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center'
  },
  header: {
    paddingTop: 30,
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    height: '80%',
    width: "100%"
  },
  title: {
    fontSize: 30,
    textAlign:'center',
    fontWeight:'bold',
    color: '#212121',
    width: "100%",
    height: "20%",
  },
  buttonContainer: {
    flex: 2.5,
  },
  buttonMethodLogin: {
    marginHorizontal: 24,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    height: height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#EEE',
    marginVertical: 10,
    width: width * 0.85
  },
  textMethodLogin: {
    marginLeft: 10,
    color: '#212121',
    fontSize: 15,
    fontFamily: 'Urbanist'
  },
 
  iconeMethodLogin: {
    marginTop: 3,
    height: height * 0.03
  },
  footer: {
   flex:1.2,
   alignItems:'center',
  },
 
})

