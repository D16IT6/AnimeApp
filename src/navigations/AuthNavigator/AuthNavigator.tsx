import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { WelcomeScreen, LoginScreen, SignUpScreen, LoginMethodScreen, ResetWelcome} from '../../Screens/AuthScreens'
import { HomeScreen, MainNavigationBar,HitAnime, Notification,Filter,SearchAnime ,NewEpisodeReleases} from '../../Screens/homeScreen'
import { AuthScreenNavigationProps } from "./Type"
import { AuthRoutes } from './Routes'
import { getItem } from '../../utils/asyncStorage'
import { AnimeDetails, CommentsScreens, VideoPlayScreen } from '../../Screens/animeDetailsScreens'
const Stack = createNativeStackNavigator<AuthScreenNavigationProps>();


const AuthNavigator = () => {

  const [showWelcome, setWelcome] = useState<boolean|null>(null);
  useEffect(() => {
    checkIfAlreadyWelcomed()
  }, [])
  const checkIfAlreadyWelcomed = async () => {
    let welcomed = await getItem('welcomed');
    if (welcomed === '1') {
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
          <Stack.Navigator initialRouteName={AuthRoutes.Welcome}>
            <Stack.Screen name={AuthRoutes.Welcome} component={WelcomeScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name={AuthRoutes.Login} component={LoginScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name={AuthRoutes.LoginMethod} component={LoginMethodScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name={AuthRoutes.SignUp} component={SignUpScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name={AuthRoutes.HomeScreen} component={HomeScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name={AuthRoutes.ResetWelcome} component={ResetWelcome}></Stack.Screen>
          </Stack.Navigator>
        )
  }
  else {
    return (
      <Stack.Navigator initialRouteName={AuthRoutes.VideoPlayScreen}>  
        <Stack.Screen name={AuthRoutes.ResetWelcome} component={ResetWelcome}></Stack.Screen>
        <Stack.Screen name={AuthRoutes.Login} component={LoginScreen} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name={AuthRoutes.LoginMethod} component={LoginMethodScreen} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name={AuthRoutes.SignUp} component={SignUpScreen} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name={AuthRoutes.MainNavigationBar} component={MainNavigationBar} options={{ headerShown: false }}></Stack.Screen>
        {/* <Stack.Screen name={AuthRoutes.HomeScreen} component={HomeScreen} options={{ headerShown: false }}></Stack.Screen> */}
        <Stack.Screen name={AuthRoutes.HitAnime} component={HitAnime} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name={AuthRoutes.NewEpisodeReleases} component={NewEpisodeReleases} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name={AuthRoutes.Notification} component={Notification} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name={AuthRoutes.SearchAnime}component={SearchAnime} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name={AuthRoutes.Filter}component={Filter} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name={AuthRoutes.AnimeDetails}component={AnimeDetails} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name={AuthRoutes.CommentsScreens}component={CommentsScreens} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name={AuthRoutes.VideoPlayScreen}component={VideoPlayScreen} options={{ headerShown: false }}></Stack.Screen>
      </Stack.Navigator>
    )
  }

}


export { AuthNavigator }