import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { WelcomeScreen, LoginScreen, SignUpScreen, LoginMethodScreen } from '../../screens/authScreens'
import { AuthScreenNavigationProps, AuthRoutes } from "../AuthNavigator"
const AuthStack = createNativeStackNavigator<AuthScreenNavigationProps>();
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator initialRouteName={AuthRoutes.LoginMethod}  >
      <AuthStack.Screen name={AuthRoutes.Welcome} component={WelcomeScreen} options={{ headerShown: false }}></AuthStack.Screen>
      <AuthStack.Screen name={AuthRoutes.Login} component={LoginScreen} options={{ headerShown: false }}></AuthStack.Screen>
      <AuthStack.Screen name={AuthRoutes.LoginMethod} component={LoginMethodScreen} options={{ headerShown: false }}></AuthStack.Screen>
      <AuthStack.Screen name={AuthRoutes.SignUp} component={SignUpScreen} options={{ headerShown: false }}></AuthStack.Screen>
    </AuthStack.Navigator>
  )
}


export { AuthNavigator }