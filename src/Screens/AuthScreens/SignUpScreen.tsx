import { View, Text, SafeAreaView, StyleSheet, Image, Dimensions, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, TextInputProps, Keyboard, ScrollView, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { logo } from '../../common/Images'
import Icon from 'react-native-vector-icons/FontAwesome';
//icon
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome'
import { Color } from '../../common/Colors';
import { useNavigation } from '@react-navigation/native'
import { AuthScreenNavigationProps, AuthRoutes } from '../../navigations/AuthNavigator';
import { ButtonAuthScreen, CheckedAuthScreen, InputAuthScreen, KeyboardAvoidingContainer, LineAuthScreen,LinkAuthScreen,Loader, NavagitonTop } from '../../common/component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fontSizes from '../../common/FontSizes';
const { width, height } = Dimensions.get('window')
export default function SignUpScreen() {
  const navigation = useNavigation<AuthScreenNavigationProps>();
  const [inputs, setInputs] = useState({
    username:'',
    password:'',
    confilmPassword:''
  })
  interface Errors {
    username?: string;
    password?: string;
    confilmPassword?:string;
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
    if(inputs.password!==inputs.confilmPassword)
    {
      handleError("Xác nhận mật khẩu không đúng !", "confilmPassword")
      isValid =false;
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
        AsyncStorage.setItem("userData",JSON.stringify(inputs))    
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
    <KeyboardAvoidingContainer style={styles.container}>
    <Loader visible={loading} />
      <NavagitonTop
      OnPressArrowBack={ 
        ()=>{navigation.navigate(AuthRoutes.LoginMethod)}
      }
      />
      <View style={styles.header}>
        <Image source={logo} style={styles.logo}></Image>

        <Text style={styles.title}>Tạo tài khoản của bạn</Text>
      </View>
      <View style={styles.contentSignUp}>      
          <InputAuthScreen
            placeholder="Tài Khoản"
            iconName="user"
            error={errors.username}
            password={false}
            onFocus={() => {
              handleError(null, "username")     
            }}
            onChangeText={(text: string) => handleOnChange(text, 'username')}
          />
          <InputAuthScreen
            placeholder="Mật Khẩu"
            iconName="lock"
            error={errors.password}
            password={true}
            onFocus={() => {
              handleError(null, "password")
            }}
            onChangeText={(text: string) => handleOnChange(text, 'password')}//(text: string) => handleOnChange(text, 'password')
          />  
             <InputAuthScreen
            placeholder="Xác nhận mật khẩu"
            iconName="lock"
            error={errors.confilmPassword}
            password={true}
            onFocus={() => {
              handleError(null, "confilmPassword")
            }}
            onChangeText={(text: string) => handleOnChange(text, 'confilmPassword')}//(text: string) => handleOnChange(text, 'password')
          /> 
          
          {/* <CheckedAuthScreen/> */}
          <ButtonAuthScreen
            title='Đăng Ký'
            onPress={() => { 
              validate()
            }
          }
          />
          <LineAuthScreen title="or continue with"/>
        
      </View>
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
    </KeyboardAvoidingContainer>
  )

}
const styles = StyleSheet.create({
  container: {
    //  flex: 1
    // do dai man hinh - thanh trang thai
    height:height-(StatusBar.currentHeight?StatusBar.currentHeight:0)
  },
  header: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: Color.SecondaryColor,
  },
  logo: {
    height: 150,
    width: 150
  },
  title: {
    fontSize: fontSizes.h2,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Color.Black,
    width: "100%",
    height: "20%",
  },
  contentSignUp: {
    flex: 3,
    backgroundColor: Color.SecondaryColor,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    
  },
  footer: {
    flex: 1,
    justifyContent:'space-around',
    backgroundColor:Color.SecondaryColor
  },
  containerMethodLogin:{
    flexDirection:'row',
    justifyContent:'center',
    alignContent:'center'
  },
  methodlogin:{
    width:"20%",  
    height:height*0.07,
    backgroundColor:Color.SecondaryColor,
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