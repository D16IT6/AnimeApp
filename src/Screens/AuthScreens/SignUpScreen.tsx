import { View, Text, SafeAreaView, StyleSheet,Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { logo } from '../../common/Images'
import { Input, Switch } from 'react-native-elements'

const {width,height}=Dimensions.get('window')
export default function SignUpScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navigation}>
      
      </View>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo}></Image>

        <Text style={styles.title}>Tạo tài khoản của bạn</Text>
      </View>
      <View style={styles.contentSignUp}>
          <Input style={styles.account}>
          
          </Input>
          <Input style={styles.password}>
          
          </Input>
          <Switch>

          </Switch>
          <TouchableOpacity></TouchableOpacity>
      </View>
      <View style={styles.footer}>

      </View>
     </SafeAreaView>
  )

}
const styles =StyleSheet.create({
  container:{
      flex:1
  },
  navigation:{
    flex:0.5,
    backgroundColor:'blue'
  },
  header:{
    flex:3.5,
    alignItems:'center',
    justifyContent:'space-evenly'
  },
  logo:{
    height: 150,
    width: 150
  },
  title:{
    fontSize: 23,
    textAlign:'center',
    fontWeight:'bold',
    color: '#212121',
    width: "100%",
    height: "20%",
  },
  account:{
    backgroundColor:'#FAFAFA',
    width :width*0.1
  },
  password:{  
    backgroundColor:'#FAFAFA',
    width :width*0.8
  },
  contentSignUp:{
    flex:3,
    backgroundColor:'yellow'
  },
  footer:{
    flex:2,
    backgroundColor:'red'
  }
})