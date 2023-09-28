import { View, Text } from 'react-native'
import React from 'react'
import  {NavigationContainer}  from '@react-navigation/native'
import  {createNativeStackNavigator}  from '@react-navigation/native-stack'
import { Welcome,Login,SignUp, LoginMethodScreen } from '../../Screens/AuthScreens'
import { HomeStackNavigatorPararamList } from '../../type'
const Stack = createNativeStackNavigator<HomeStackNavigatorPararamList>();
type AppNavigationProps = {};
export default function appNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginMethodScreen"  >
        <Stack.Screen name="Welcome" component={Welcome} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='LoginMethodScreen' component={LoginMethodScreen} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name="SignUp" component={SignUp } options={{headerShown:false}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}