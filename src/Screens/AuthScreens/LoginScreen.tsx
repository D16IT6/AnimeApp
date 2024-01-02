import { View, Text, SafeAreaView, StyleSheet, Image, Dimensions, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, TextInputProps, Keyboard, ScrollView, Platform, StatusBar } from 'react-native'
import React, { useRef, useState } from 'react'
import { logo } from '../../common/Images'
import { Color } from '../../common/Colors';
import { useNavigation } from '@react-navigation/native'
import { AuthScreenNavigationProps, AuthRoutes } from '../../navigations/AuthNavigator';
import { ButtonAuthScreen, CheckedAuthScreen, InputAuthScreen, KeyboardAvoidingContainer, LineAuthScreen, LinkAuthScreen, Loader, NavagitonTop } from '../../common/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fontFamily from '../../common/FontFamily';
import { apiAuth } from '../../apiService/AuthService';
import { Errors, LoginRequestViewModel } from '../../ModelView';
import { notDev } from '../../utils/extensionMethod';
import { InputAuthScreenRef } from '../../common/components/InputAuthScreen';
import Screen from '../../utils/screenInformation';

export default function LoginMethodScreen() {
  const navigation = useNavigation<AuthScreenNavigationProps>();
  const userNameRef = useRef<InputAuthScreenRef>(null)
  const passwordRef = useRef<InputAuthScreenRef>(null)

  const [errors, setErrors] = useState<Errors>({})
  const [loading, setLoading] = useState(false)
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!userNameRef.current?.getValue()) {
      handleError("Vui lòng nhập tài khoản !", "username")
      isValid = false;
    }
    if (!passwordRef.current?.getValue()) {
      handleError("Vui lòng nhập mật khẩu !", "password")
      isValid = false;
    }
    else if (passwordRef.current.getValue().length< 5) {
      handleError("Mật khẩu phải trên 5 kí tự !", "password")
      isValid = false;
    }
    if (isValid) {
      regisiter()
    }
  }
  const regisiter = async () => {
    setLoading(true)
    const model: LoginRequestViewModel = {
      UserName: userNameRef.current?.getValue().toString()||"",
      Password: passwordRef.current?.getValue().toString()||"",
      RememberMe: true
    }
    const data = await apiAuth.login(model)
    setLoading(false)
    if (data !== null) {
      console.log(data);

      AsyncStorage.setItem("AccessToken", data.AccessToken)
      AsyncStorage.setItem("RefreshToken", data.RefreshToken)

      navigation.navigate(AuthRoutes.MainNavigationBar)
    }
    else {
      Alert.alert("Đăng nhập thất bại")
    }
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
          ref = {userNameRef}
          placeholder="Tài Khoản"
          iconName="user"
          error={errors.username}
          password={false}
          onFocus={() => {
            handleError(null, "username")
          }}
          onSubmit={()=>passwordRef.current?.onFocus()}
        />
        <InputAuthScreen
          ref ={passwordRef}
          placeholder="Mật Khẩu"
          iconName="lock"
          error={errors.password}
          password={true}
          onFocus={() => {
            handleError(null, "password")
          }}
        />
        <CheckedAuthScreen onCheckedChange={handleCheckedChange} />
        <ButtonAuthScreen
          title='Đăng nhập'
          onPressBtn={() => {
            validate()
          }
          }
        />
        <Text style={styles.forgotPassword} onPress={
          ()=>{
            navigation.navigate("ForgotPasswordScreen")
          }
        }>
          Bạn đã quên mật khẩu ?
        </Text>
        <LineAuthScreen title="or continue with" />

      </View>
      <View style={styles.footer}>
        <View style={styles.containerMethodLogin}>
          <TouchableOpacity style={styles.methodlogin} onPress={notDev}>
            <Image source={require("../../assets/icons/facebook.png")} style={styles.iconMethodLogin}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.methodlogin} onPress={notDev}>
            <Image source={require("../../assets/icons/google.png")} style={styles.iconMethodLogin}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.methodlogin} onPress={notDev}>
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
    height: Screen.height - (StatusBar.currentHeight ? StatusBar.currentHeight : 0)
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
    height: Screen.height * 0.07,
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