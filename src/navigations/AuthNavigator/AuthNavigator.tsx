import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { WelcomeScreen, LoginScreen, SignUpScreen, LoginMethodScreen, ResetWelcome } from '../../Screens/AuthScreens'
import { AuthScreenNavigationProps } from "./Type"
import { AuthRoutes } from './Routes'
import { getItem } from '../../utils/asyncStorage'
const Stack = createNativeStackNavigator<AuthScreenNavigationProps>();


const AuthNavigator = () => {

  const [showWelcome, setWelcome] = useState(null);
  useEffect(() => {
    checkIfAlreadyWelcomed()
  }, [])
  const checkIfAlreadyWelcomed = async () => {
    let welcomed = await getItem('welcomed');
    if (welcomed == 1) {
      setWelcome(false);
    }
    else {
      setWelcome(true);
    }
  }
  if(showWelcome==null)
  {
    return null;
  }
  if (showWelcome) {
    return (
          <Stack.Navigator initialRouteName="WelcomeScreen">
            <Stack.Screen name={AuthRoutes.Welcome} component={WelcomeScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name={AuthRoutes.Login} component={LoginScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name={AuthRoutes.LoginMethod} component={LoginMethodScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name={AuthRoutes.SignUp} component={SignUpScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name={AuthRoutes.ResetWelcome} component={ResetWelcome}></Stack.Screen>
          </Stack.Navigator>
        )
  }
  else {
    return (
      <Stack.Navigator initialRouteName={AuthRoutes.ResetWelcome}>  
        <Stack.Screen name={AuthRoutes.ResetWelcome} component={ResetWelcome}></Stack.Screen>
      </Stack.Navigator>
    )
  }

}


export { AuthNavigator }