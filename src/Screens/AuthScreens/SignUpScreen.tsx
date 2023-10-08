import { View, Text, SafeAreaView, StyleSheet, Image, Dimensions, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, TextInputProps, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { logo } from '../../common/Images'
import Icon from 'react-native-vector-icons/FontAwesome';
//icon
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome'
import { PrimaryColor, WhiteCustom, errorColor } from '../../common/Colors';
import { useNavigation } from '@react-navigation/native'
import { AuthScreenNavigationProps, AuthRoutes } from '../../navigations/AuthNavigator';
import { ButtonAuthScreen, CheckedAuthScreen, InputAuthScreen, LineAuthScreen,LinkAuthScreen,Loader } from '../../common/component';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window')
export default function SignUpScreen() {
  const navigation = useNavigation<AuthScreenNavigationProps>();
  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  })
  interface Errors {
    username?: string;
    password?: string;
    // Các thuộc tính khác và kiểu tùy ý
  }
  const [errors, setErrors] = useState<Errors>({})
  const [loading,setLoading] =useState(false)
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.username) {
      handleError("Vui lòng nhập tài khoản !", "username")
      isValid = false;
    }
    if (!inputs.password) {
      handleError("Vui lòng nhập mật khẩu !", "password")
      isValid = false;
    }
    else if(inputs.password.length<5)
    {
      handleError("Mật khẩu phải trên 5 kí tự !", "password")
      isValid = false;
    }
    if(isValid)
    {
      regisiter()
    }
  }
  const regisiter = ()=>{
    setLoading(true),
    setTimeout(() => {
      setLoading(false)
      try {
        if(false)
        {
          AsyncStorage.setItem("user",JSON.stringify(inputs))
        }
        else{
          Alert.alert("Error","Có lỗi rồi!!!")
        }
        
        navigation.navigate(AuthRoutes.Login)
      } catch (error) {
        Alert.alert("Error","Có lỗi rồi!!!")
      }
    }, 3000);

  }
  
  const handleOnChange = (text: any, input: string) => {
    setInputs(prevState => ({ ...prevState, [input]: text }))
  }
  const handleError = (errorMessage: string | null, input: string) => {
    setErrors(prevState => ({ ...prevState, [input]: errorMessage }))
  }
  return (
    <SafeAreaView style={styles.container}>
    <Loader visible={loading} />
      <View style={styles.navigation}>
        <Ionicons name='arrow-back'
          onPress={() => {
            navigation.navigate(AuthRoutes.LoginMethod)

          }}
          size={30} color='#212121' />
      </View>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo}></Image>

        <Text style={styles.title}>Tạo tài khoản của bạn</Text>
      </View>
      <KeyboardAvoidingView style={styles.contentSignUp}>     
          <InputAuthScreen
            placeholder="Nhập tài khoản"
            iconName="user"
            error={errors.username}
            password={false}
            onFocus={() => {
              handleError(null, "username")     
            }}
            onChangeText={(text: string) => handleOnChange(text, 'username')}
          />
          <InputAuthScreen
            placeholder="Nhập mật khẩu"
            iconName="lock"
            error={errors.password}
            password={true}
            onFocus={() => {
              handleError(null, "password")
            }}
            onChangeText={(text: string) => handleOnChange(text, 'password')}//(text: string) => handleOnChange(text, 'password')
          />
          <CheckedAuthScreen/>
          <ButtonAuthScreen
            title='Đăng Ký'
            onPress={() => { 
              validate()
            }
          }
          />
          <LineAuthScreen title="or continue with"/>
        
      </KeyboardAvoidingView>
      <View style={styles.footer}>
          <View style={styles.containerMethodLogin}>
            <TouchableOpacity style={styles.methodlogin}>
              <Image source={require("../../assets/icons/facebook.png")} style={styles.iconMethodLogin}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.methodlogin}>
              <Image source={require("../../assets/icons/google.png")} style={styles.iconMethodLogin}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.methodlogin}>
            <Image source={require("../../assets/icons/apple.png")} style={styles.iconMethodLogin}></Image>
            </TouchableOpacity>
          </View>
          <LinkAuthScreen 
          title="Bạn đã có tài khoản"
          onPress={()=>{
            navigation.navigate(AuthRoutes.Login)
          }}
          textlink="Đăng Nhập"         
          ></LinkAuthScreen>
      </View>
    </SafeAreaView>
  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigation: {
    //flex: 0.5,
    backgroundColor: '#ffffff',
    paddingLeft:10
  },
  header: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#ffffff',
  },
  logo: {
    height: 150,
    width: 150
  },
  title: {
    fontSize: 23,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#212121',
    width: "100%",
    height: "20%",
  },
  contentSignUp: {
    flex: 3,
    backgroundColor: '#ffffff',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  footer: {
    flex: 1,
    justifyContent:'space-around',
    backgroundColor:'#fff'
  },
  containerMethodLogin:{
    flexDirection:'row',
    justifyContent:'center',
    alignContent:'center'
  },
  methodlogin:{
    width:"20%",  
    height:height*0.07,
    backgroundColor:'#fff',
    borderRadius:16,
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1,
    borderColor:"#EEE",
    marginHorizontal:20
  },
  iconMethodLogin: {
    maxWidth: "40%",
    //height: "auto"
  }
})