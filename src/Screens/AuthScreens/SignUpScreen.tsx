import { View, Text, SafeAreaView, StyleSheet, Image, Dimensions, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { logo } from '../../common/Images'
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { PrimaryColor } from '../../common/Colors';
import { useNavigation } from '@react-navigation/native'
import { AuthScreenNavigationProps, AuthRoutes } from '../../navigations/AuthNavigator';
import { color } from 'react-native-elements/dist/helpers';
//import { MotiView, MotiText } from 'moti';


const { width, height } = Dimensions.get('window')
export default function SignUpScreen() {
  const navigation = useNavigation<AuthScreenNavigationProps>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [focususerName, setForcusUserName] = useState(false)
  const [focusPassword, setForcusPassword] = useState(false)
  const [focusConfirmPassword, setForcusConfirmPassword] = useState(false)
  const [hidePassWord, setHidePassword] = useState(false)
  const [hideConfirmPassWord, setHideConfirmPassword] = useState(false)
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
          <View style={[styles.inputContiner,
          {
            backgroundColor: focususerName ? '#ebfaf1' : '#FAFAFA',
            borderColor: focususerName ? PrimaryColor : '#FAFAFA'
          }
          ]}>
            <MaterialCommunityIcons name="email" size={20} color={focususerName ? PrimaryColor : "#9e9e9e"} />
            <TextInput style={styles.account}
              autoCorrect={false}
              placeholder='Tài khoản'
              value={username}
              onChangeText={text => setUsername(text)
              }
              onFocus={() => {
                setForcusUserName(!focususerName)
              }}
              onBlur={() => {
                setForcusUserName(!focususerName)
              }}
            >
            </TextInput>
          </View >
          <View style={[styles.inputContiner,
          {
            backgroundColor: focusPassword ? '#ebfaf1' : '#FAFAFA',
            borderColor: focusPassword ? PrimaryColor : '#FAFAFA'
          }
          ]}>

            <MaterialCommunityIcons name="lock" size={20} color={focusPassword ? PrimaryColor : "#9e9e9e"} />

            <TextInput style={[styles.password, { backgroundColor: focusPassword ? '#ebfaf1' : '#FAFAFA', }]}
              autoCorrect={false}
              placeholder='Mật khẩu'
              secureTextEntry={hidePassWord}
              value={password}
              onChangeText={text => setPassword(text)}
              onFocus={() => {
                setForcusPassword(!focusPassword)
              }}
              onBlur={() => {
                setForcusPassword(!focusPassword)
              }}
            >
            </TextInput>
            <MaterialCommunityIcons name={hidePassWord ? "eye" : "eye-off"}
              onPress={() => {
                setHidePassword(!hidePassWord)
              }}
              size={20} color={focusPassword ? PrimaryColor : "#9e9e9e"} />
          </View>

          <View style={[styles.inputContiner,
          {
            backgroundColor: focusConfirmPassword ? '#ebfaf1' : '#FAFAFA',
            borderColor: focusConfirmPassword ? PrimaryColor : '#FAFAFA'
          }
          ]}>

            <MaterialCommunityIcons name="lock" size={20} color={focusConfirmPassword ? PrimaryColor : "#9e9e9e"} />

            <TextInput style={[styles.confirmpassword, { backgroundColor: focusConfirmPassword ? '#ebfaf1' : '#FAFAFA', }]}
              autoCorrect={false}
              placeholder='Xác nhận mật khẩu'
              secureTextEntry={hideConfirmPassWord}
              value={confirmpassword}
              onChangeText={text => setPassword(text)}
              onFocus={() => {
                setForcusConfirmPassword(!focusConfirmPassword)
              }}
              onBlur={() => {
                setForcusConfirmPassword(!focusConfirmPassword)
              }}
            >
            </TextInput>

            <MaterialCommunityIcons name={hideConfirmPassWord ? "eye" : "eye-off"}
              onPress={() => {
                setHideConfirmPassword(!hideConfirmPassWord)
              }}
              size={20} color={focusConfirmPassword ? PrimaryColor : "#9e9e9e"} />
          </View>
          <TouchableOpacity></TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.footer}>
        {/* <MotiView 
          from={{
            transform: [
              {
                scale: 0,
              },
              {
                translateY: -10,
              },
            ],
          }}
          animate={{
            transform: [{ scale: 1 }, { translateY: 0 }],
          }}
          style={{width:100,height:100,backgroundColor:'green'}}
          
          >
          
        </MotiView> */}
      </View>
    </SafeAreaView>
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

  footer: {
    flex: 2,
    backgroundColor: 'red'
  }
})