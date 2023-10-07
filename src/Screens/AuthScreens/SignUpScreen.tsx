import { View, Text, SafeAreaView, StyleSheet, Image, Dimensions, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, TextInputProps, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { logo } from '../../common/Images'
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { PrimaryColor, WhiteCustom, errorColor } from '../../common/Colors';
import { useNavigation } from '@react-navigation/native'
import { AuthScreenNavigationProps, AuthRoutes } from '../../navigations/AuthNavigator';
import { color } from 'react-native-elements/dist/helpers';


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
      handleError("Vui long nhap tai khoan", "username")
      isValid = false;
    }
    if (!inputs.password) {
      handleError("Vui long nhap mat khau", "password")
      isValid = false;
    }
    if(isValid)
    {
      Alert.alert("dungs het roi",JSON.stringify(Error))
    }
  }

  const handleOnChange = (text: any, input: string) => {
    setInputs(prevState => ({ ...prevState, [input]: text }))
  }
  const handleError = (errorMessage: string | null, input: string) => {
    setErrors(prevState => ({ ...prevState, [input]: errorMessage }))
  }
  return (
    <SafeAreaView style={styles.container}>
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
        <View style={styles.contentSignUp}>
          <InputLogin
            placeholder="Nhập tài khoản"
            IconName="email"
            error={errors.username}
            password={false}
            onFocus={() => {
              handleError(null, "username")
              //Alert.alert("tai khoan",JSON.stringify(errors))
            }}
            onChangeText={(text: string) => handleOnChange(text, 'username')}
          />
          <InputLogin
            placeholder="Nhập mật khẩu"
            IconName="lock"
            error={errors.password}
            password={true}
            onFocus={() => {
              handleError(null, "password")
              //Alert.alert("mat khau",JSON.stringify(errors))
            }}
            onChangeText={(text: string) => handleOnChange(text, 'password')}
          />
          <ButtonLogin
            title='Đăng Nhập'
            onPress={() => { 
              validate()
              Alert.alert(JSON.stringify(inputs))
            }
          }//validate
          />
          <TouchableOpacity></TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.footer}>

      </View>
    </SafeAreaView>
  )

}
interface InputLoginProps {
  placeholder: string;
  IconName: string;
  error?: string;
  password: boolean;
  onFocus: Function;
  onChangeText: Function;
  children?: React.ReactNode;
}
const InputLogin: React.FC<InputLoginProps> = ({
  placeholder,
  IconName,
  error,
  password,
  onFocus ,
  onChangeText ,
  ...props
}) => {
  const [isFocus, setIsforcus] = useState(false)
  const [hidePassWord, setHidePassword] = useState(false)
  return (
    <View >
      <View style={[styles.inputContiner,
      {
        backgroundColor: isFocus ? '#ebfaf1' : '#FAFAFA',
        borderColor: error ? 'red' : isFocus ? PrimaryColor : '#FAFAFA' //neu loi do neu chon mau chinh else trang
      }
      ]}>
        <MaterialCommunityIcons name={IconName} size={20} color={isFocus ? PrimaryColor : "#9e9e9e"} />

        <TextInput style={[styles.password, { backgroundColor: isFocus ? '#ebfaf1' : '#FAFAFA', }]}
          autoCorrect={false}
          placeholder={placeholder}
          secureTextEntry={hidePassWord}
          // value={value}   
          // onChangeText={text => setValue(text)}
          onFocus={() => {
            setIsforcus(!isFocus)
            onFocus()
          }}
          onBlur={() => {
            setIsforcus(!isFocus)
          }}               
          {...props}
        >
        </TextInput>
        {
          password && (
            <MaterialCommunityIcons name={hidePassWord ? "eye" : "eye-off"}
              onPress={() => {
                setHidePassword(!hidePassWord)
              }}
              size={20} color={isFocus ? PrimaryColor : "#9e9e9e"} />
          )
        }

      </View>
      {
        error && (
          <Text style={styles.error}>{error}</Text>
        )
      }
    </View>
  )
}


interface ButtonLoginProps {
  title: string;
  onPress: () => void;
  children?: React.ReactNode;
}
const ButtonLogin: React.FC<ButtonLoginProps> = ({ title, onPress = () => { } }) => {
  return (
    <TouchableOpacity style={styles.buttonLogin}
      onPress={
        onPress
      }>
      <Text>{title}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigation: {
    flex: 0.5,
    backgroundColor: 'blue'
  },
  header: {
    flex: 3.5,
    alignItems: 'center',
    justifyContent: 'space-evenly'
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
  inputContiner: {
    flexDirection: 'row',
    borderRadius: 10,
    width: width * 0.9,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FAFAFA',
    paddingHorizontal: 15
  },
  account: {
    backgroundColor: '#FAFAFA',
    flex: 1
  },
  password: {
    backgroundColor: '#FAFAFA',
    flex: 1
  },
  confirmpassword: {
    backgroundColor: '#FAFAFA',
    flex: 1
  },
  contentSignUp: {
    flex: 3,
    backgroundColor: 'yellow',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  error: {
    color: errorColor,
    fontSize: 12,
  },
  buttonLogin: {
    // width:width*0.9,
    // height:height*0.07,
    // backgroundColor: PrimaryColor,
    // justifyContent:'center',
    // alignItems:'center',
    marginHorizontal: 24,
    flexDirection: 'row',
    backgroundColor: PrimaryColor,
    height: height * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 2,
    borderRadius: 30,
    //borderColor: '#EEE',
    marginVertical: 10,
    width: width * 0.9,
  },
  footer: {
    flex: 2,
    backgroundColor: 'blue'
  }
})