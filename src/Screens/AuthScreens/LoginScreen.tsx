import { View, Text,TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { HomeScreenNavigationProp } from '../../navigations/AuthNavigator.Type';
export default function LoginScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <SafeAreaView>
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
    </SafeAreaView>
  )
}

const style =StyleSheet.create({
  container:{
    flex:1
  }
})

