import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { AuthScreenNavigationProps, AuthRoutes } from "../../navigations/AuthNavigator";
import { appleIcon, facebookIcon, googleIcon } from '../../common/Icons';
import LottieView from 'lottie-react-native';
import { PrimaryColor } from '../../common/Colors';
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
        <TouchableOpacity style={styles.buttonMethodLogin}>
          <Image source={facebookIcon} style={styles.iconeMethodLogin} />
          <Text style={styles.textMethodLogin}>Tiếp tục với Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonMethodLogin}>
          <Image source={googleIcon} style={styles.iconeMethodLogin} />
          <Text style={styles.textMethodLogin}>Tiếp tục với Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonMethodLogin}>
          <Image source={appleIcon} style={styles.iconeMethodLogin} />
          <Text style={styles.textMethodLogin}>Tiếp tục với Apple</Text>
        </TouchableOpacity>
        <View style={styles.containerline}>
          <View style={styles.line} />
          <Text style={styles.textor}>or</Text>
          <View style={styles.line} />
        </View>
      </View >
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.buttonLogin}
        >
          <Text style={styles.textLogin}>
            Đăng nhập bằng mật khẩu
          </Text>
        </TouchableOpacity>
        <View style={styles.accountCreation}>
        <Text style={styles.textQuestion}>Bạn có muốn tạo tài khoản? </Text>
        <TouchableOpacity onPress={() => {
          navigation.navigate(AuthRoutes.SignUp)
        }}>
          <Text style={styles.textSignup}>Đăng ký</Text>
        </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}
const deviceHeight = Dimensions.get('window').height;
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
  containerline: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#EEEEEE',
  },
  textor: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#000',
  },
  iconeMethodLogin: {
    marginTop: 3,
    height: height * 0.03
  },
  buttonLogin: {
    marginHorizontal: 24,
    flexDirection: 'row',
    backgroundColor: PrimaryColor,
    height: height * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 30,
    borderColor: '#EEE',
    marginVertical: 10,
    width: width * 0.8,
  },
  textLogin: {
    color: '#FFF',
    fontSize: 15,
    paddingHorizontal: 10,
    fontFamily: 'Urbanist'
  },
  textQuestion:{
    fontSize: 10,
    fontFamily: 'Urbanist',
    paddingHorizontal:6,
  },
  textSignup: {
    color: PrimaryColor,
    fontSize: 10,
    fontFamily: 'Urbanist'
  },
  footer: {
   flex:1.2,
   alignItems:'center',
  },
  accountCreation:{
    flexDirection:'row',
    justifyContent:'center',
  }
})

