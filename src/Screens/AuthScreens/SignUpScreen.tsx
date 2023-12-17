import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Alert, Keyboard, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { logo } from '../../common/Images'

import { Color } from '../../common/Colors';
import { useNavigation } from '@react-navigation/native'
import { AuthScreenNavigationProps, AuthRoutes } from '../../navigations/AuthNavigator';
import { ButtonAuthScreen, InputAuthScreen, KeyboardAvoidingContainer, LineAuthScreen, LinkAuthScreen, Loader, NavagitonTop } from '../../common/components';
import fontSizes from '../../common/FontSizes';
import { apiAuth } from '../../apiService/AuthService';
import { notDev } from '../../utils/extensionMethod';
const { width, height } = Dimensions.get('window')
export default function SignUpScreen() {
  const navigation = useNavigation<AuthScreenNavigationProps>();

  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    confilmPassword: '',
    email: ''
  })
  interface Errors {
    username?: string;
    email?: string;
    password?: string;
    confilmPassword?: string;
  }
  const [errors, setErrors] = useState<Errors>({})
  const [loading, setLoading] = useState(false)


  const validateEmail = (email: string) => {
    const regex = (/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/);

    return regex.test(email);
  };

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
    if (inputs.password !== inputs.confilmPassword) {
      handleError("Xác nhận mật khẩu không đúng !", "confilmPassword")
      isValid = false;
    }
    if (!inputs.email) {
      handleError("Chưa nhập email !", "email")
      isValid = false;
    }
    else if (!validateEmail(inputs.email)) {
      handleError("Nhập email chưa đúng định dạng !", "email")
      isValid = false;
    }
    if (isValid) {
      regisiter()
    }
  }
  const regisiter = async () => {
    try {
      setLoading(true)
      const checkSiup = await apiAuth.sigup(
        {
          UserName: inputs.username,
          Password: inputs.password,
          Email: inputs.email
        })
      setLoading(false)
      if (checkSiup) {
        Alert.alert(
          'Thông báo',
          'Thêm tài khoản thành công!!!',
          [
            {
              text: 'Đóng',
              onPress: () => console.log('Đóng Pressed'),
              style: 'cancel', // Màu đậm cho nút "Đóng"
            },
            {
              text: 'Xác nhận',
              onPress: () => console.log('Xác nhận Pressed'),
              style: 'default', // Màu mặc định cho nút "Xác nhận"
            },
          ],
          { cancelable: false } // Ngăn chặn người dùng đóng Alert bằng cách chạm bên ngoài
        );
        navigation.navigate(AuthRoutes.Login)
      }
      else {
        Alert.alert(
          'Cảnh báo',
          'Thêm tài khoản thất bại!!!\n*Trùng email\n*Trùng userName',
          [
            {
              text: 'Đóng',
              onPress: () => console.log('Đóng Pressed'),
              style: 'cancel', // Màu đậm cho nút "Đóng"
            },
            {
              text: 'Xác nhận',
              onPress: () => console.log('Xác nhận Pressed'),
              style: 'default', // Màu mặc định cho nút "Xác nhận"
            },
          ],
          { cancelable: false } // Ngăn chặn người dùng đóng Alert bằng cách chạm bên ngoài
        );
      }
    } catch (error) {
      console.log(error)
    }
    // setLoading(true),
    // setTimeout(() => {
    //   setLoading(false)
    //   try {
    //     AsyncStorage.setItem("userData",JSON.stringify(inputs))    
    //     navigation.navigate(AuthRoutes.Login)
    //   } catch (error) {
    //     Alert.alert("Error","Có lỗi rồi!!!")
    //   }
    // }, 3000);
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

        <Text style={styles.title}>Tạo tài khoản của bạn</Text>
      </View>
      <View style={styles.contentSignUp}>
        <InputAuthScreen
          placeholder="Tài Khoản"
          iconName="user"
          error={errors.username}
          onFocus={() => {
            handleError(null, "username")
          }}
          onChangeText={(text: string) => handleOnChange(text, 'username')}
        />
        <InputAuthScreen
          placeholder="Email"
          iconName="envelope-o"
          error={errors.email}
          onFocus={() => {
            handleError(null, "email")
          }}
          onChangeText={(text: string) => handleOnChange(text, 'email')}
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
          onPressBtn={() => {
            validate()
          }
          }
        />
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
          title="Bạn đã có tài khoản"
          onPress={() => {
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
    height: height - (StatusBar.currentHeight ? StatusBar.currentHeight : 0)
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
    //height: "auto"
  }
})