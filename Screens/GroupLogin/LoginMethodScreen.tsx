import { View, Text,TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { HomeScreenNavigationProp } from '../../type';

export default function LoginMethodScreen() {
    // const facebookIcon = require('../../assets/icons/facebook.ico')
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <SafeAreaView>
      <View>
        <Text>
            Đăng Nhập
        </Text>
        <TouchableOpacity style={styles.buttonLogin}>
            <Image source={require('../../assets/icons/facebook.png')} />
            <Text>Tiếp tục với Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text>Tiếp tục với Google</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text>Tiếp tục với Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            marginHorizontal: 80,
          }}
          onPress={
            () => navigation.navigate("Welcome")}
        >
          <Text>
            Login method
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
const deviceHeight = Dimensions.get('window').height;
const styles =StyleSheet.create({
  container:{
    flex:1
  },
  buttonLogin:{
    height: deviceHeight/24

  }
})

