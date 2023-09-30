import { View, Text,TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { AuthScreenNavigationProps } from '../../navigations/AuthNavigator/Type';
import { AuthRoutes } from '../../navigations/AuthNavigator/Routes';
export default function LoginScreen() {
  const navigation = useNavigation<AuthScreenNavigationProps>();
  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            marginHorizontal: 80,
          }}
          onPress={
            () => navigation.navigate(AuthRoutes.LoginMethod)}
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

