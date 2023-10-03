import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { AuthScreenNavigationProps, AuthRoutes } from "../../navigations/AuthNavigator";
import { appleIcon, facebookIcon, googleIcon } from '../../common/Icons';
import LottieView from 'lottie-react-native';
import { PrimaryColor } from '../../common/Colors';

export default function LoginMethodScreen() {
  const navigation = useNavigation<AuthScreenNavigationProps>();
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <LottieView
          source={require('../../assets/animation/animation_loginmethod.json')}
          style={styles.animation}
          autoPlay
          loop
        />
        <Text style={styles.title}>Cho phép bạn vào</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonMethodLogin}>
          <Image source={facebookIcon} style={styles.iconMethodLogin} />
          <Text style={styles.textMethodLogin}>Tiếp tục với Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonMethodLogin}>
          <Image source={googleIcon} style={styles.iconMethodLogin} />
          <Text style={styles.textMethodLogin}>Tiếp tục với Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonMethodLogin}>
          <Image source={appleIcon} style={styles.iconMethodLogin} />
          <Text style={styles.textMethodLogin}>Tiếp tục với Apple</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonLogin}>
          <Text style={styles.textLogin}>Đăng nhập bằng mật khẩu</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text>Bạn có muốn tạo tài khoản? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(AuthRoutes.SignUp);
          }}
        >
          <Text style={styles.textSignup}>Đăng ký</Text>
        </TouchableOpacity>
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
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  animation: {
    height: 300,
    width: 300
  },
  title: {
    fontSize: 30,
    marginHorizontal: 30,
    marginVertical: 20,
    color: '#212121'
  },
  buttonContainer: {
    flex: 3,
    justifyContent: 'center'
  },
  buttonMethodLogin: {
    marginHorizontal: 24,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#EEE',
    marginVertical: 10
  },
  textMethodLogin: {
    marginLeft: 10,
    color: '#212121',
    fontSize: 20,
    fontFamily: 'Urbanist'
  },
  iconMethodLogin: {
    marginTop: 3,
    height: 30
  },
  buttonLogin: {
    marginHorizontal: 24,
    flexDirection: 'row',
    backgroundColor: PrimaryColor,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 30,
    borderColor: '#EEE',
    marginVertical: 10,
  },
  textLogin: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'Urbanist'
  },
  textSignup: {
    color: PrimaryColor,
    fontSize: 16,
    fontFamily: 'Urbanist'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});