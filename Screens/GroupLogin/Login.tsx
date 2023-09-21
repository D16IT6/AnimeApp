import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/core'
import { HomeScreenNavigationProp } from '../type';
export default function Login() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          marginHorizontal: 80,
        }}
        onPress={
          () => navigation.navigate("Welcome")}
      >
        <Text>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  )
}