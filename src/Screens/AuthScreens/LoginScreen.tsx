import { View, Text, SafeAreaView, StyleSheet, Image, Dimensions, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, TextInputProps, Keyboard, ScrollView, Platform, StatusBar } from 'react-native'
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
import { ButtonAuthScreen, CheckedAuthScreen, InputAuthScreen, KeyboardAvoidingContainer, LineAuthScreen, LinkAuthScreen, Loader, NavagitonTop } from '../../common/component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fontFamily from '../../common/FontFamily';
import{mainApiUrl} from '../../../app.json'


const loginApi = mainApiUrl + '/Auth'
const { width, height } = Dimensions.get('window')
export default function LoginMethodScreen() {
  const navigation = useNavigation<AuthScreenNavigationProps>();
  const [inputs, setInputs] = useState({
    username:'',
    password:''
  })
  interface Errors {
    username?: string;
    password?: string;
  }
  const [errors, setErrors] = useState<Errors>({})
  const [loading, setLoading] = useState(false)
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
    else if (inputs.password.length < 5) {
      handleError("Mật khẩu phải trên 5 kí tự !", "password")
      isValid = false;
    }
    if (isValid) {
      regisiter()
    }
  }
  interface UserData1 {
    username: string;
    password: string;
    loggedIn: boolean
  }
  const regisiter = () => {
    setLoading(true),
      setTimeout(async () => {
        setLoading(false);
        let userData = await AsyncStorage.getItem('userData');
        console.log(userData)
        if (userData) {
          const parsedUserData: UserData1 = JSON.parse(userData);
          console.log(parsedUserData)
          if (
            inputs.username === parsedUserData.username &&
            inputs.password === parsedUserData.password
          ) {
            navigation.navigate(AuthRoutes.MainNavigationBar);
            // AsyncStorage.setItem(
            //   'userData',
            //   JSON.stringify({...userData, loggedIn: true}),
            // );
          } else {
            Alert.alert('Lỗi', 'Bạn đã nhập sai thông tin');
          }
        } else {
          Alert.alert('Error', 'User does not exist');
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
          () => { navigation.navigate(AuthRoutes.LoginMethod) }
        }
      />
      <View style={styles.header}>
        <Image source={logo} style={styles.logo}></Image>

        <Text style={styles.title}> Đăng nhập với tài khoản của bạn </Text>
      </View>
      <View
      style={styles.contentSignUp}>
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
        <CheckedAuthScreen onCheckedChange={handleCheckedChange} />
        <ButtonAuthScreen
          title='Đăng nhập'
          onPress={() => {
            validate()
          }
          }
        />
        <Text style={styles.forgotPassword} onPress={() => {
          navigation.navigate(AuthRoutes.ResetWelcome)
        }}>
          Bạn đã quên mật khẩu ?
        </Text>
        <LineAuthScreen title="or continue with" />

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
          title="Bạn chưa có tài khoản"
          onPress={() => {
            navigation.navigate(AuthRoutes.SignUp)
          }}
          textlink="Đăng Ký"
        ></LinkAuthScreen>
      </View>
    </KeyboardAvoidingContainer>
  )

}
const handleCheckedChange = (isChecked: string) => {
  if (isChecked) {
    console.log("Đã tích", isChecked);
  } else {
    console.log("Chưa tích" + isChecked);
  }
};

const styles = StyleSheet.create({
  container: {
     //flex: 1
   // do dai man hinh - thanh trang thai
   height:height-(StatusBar.currentHeight?StatusBar.currentHeight:0)
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  keyboardAvoidingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 23,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Color.Black,
    width: "100%",
    height: "20%",
    fontFamily: fontFamily.PrimaryFont,
  },
  contentSignUp: {
      flex: 3,
    backgroundColor: Color.SecondaryColor,
    justifyContent: 'space-evenly',
    alignItems: 'center'

  },
  forgotPassword: {
    fontSize: 16,
    fontFamily: fontFamily.PrimaryFont,
    color: Color.PrimaryColor,
  },
  footer: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: Color.SecondaryColor
  },
  containerMethodLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center'
  },
  methodlogin: {
    width: "20%",
    height: height * 0.07,
    backgroundColor: Color.SecondaryColor,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#EEE",
    marginHorizontal: 20
  },
  iconMethodLogin: {
    maxWidth: "40%",
  }
})