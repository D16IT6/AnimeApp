import { View, Text } from 'react-native'
import React from 'react'
import  {NavigationContainer}  from '@react-navigation/native'
import  {createNativeStackNavigator}  from '@react-navigation/native-stack'
import { WelcomeScreen, LoginScreen, SignUpScreen, LoginMethodScreen } from '../screens/authScreens'
import { HomeStackNavigatorPararamList } from './AuthNavigator.Type'
const Stack = createNativeStackNavigator<HomeStackNavigatorPararamList>();
export default function appNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginMethod"  >
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='LoginMethod' component={LoginMethodScreen} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name="SignUp" component={SignUpScreen } options={{headerShown:false}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}