import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { WelcomeScreen, LoginScreen, SignUpScreen, LoginMethodScreen, ResetWelcome } from '../../Screens/AuthScreens'
import { MainNavigationBar, HitAnime, Notification, Filter, SearchAnime, NewEpisodeReleases } from '../../Screens/homeScreen'
import { AuthScreenNavigationProps } from "./Type"
import { AuthRoutes } from './Routes'
import { getItem, setItem } from '../../utils/asyncStorage'
import { AnimeDetails, CommentsScreens, VideoPlayScreen } from '../../Screens/animeDetailsScreens'
const Stack = createNativeStackNavigator<AuthScreenNavigationProps>();
const getAccessToken = async (): Promise<string | undefined> => {
  return getItem("AccessToken")
    .then((accessToken) => accessToken?.toString())
    .catch((error) => {
      console.error("Error getting access token:", error);
      return undefined;
    });
};
let firstRoute = AuthRoutes.MainNavigationBar;
(async () => {
  try {
    const token = await getAccessToken();
    const isFirstWelcome = (await getItem('welcomed')) == '1';

    console.log('token: ' + token)
    console.log('isFirstWelcome: ' + isFirstWelcome)
    if (isFirstWelcome) {
      await setItem('welcomed', '0')
      firstRoute = AuthRoutes.Welcome
      return;
    }
    if (token === undefined) {
      console.log('da toi day')
      firstRoute = AuthRoutes.LoginMethod
    }
    else {
      firstRoute = AuthRoutes.MainNavigationBar;

    }
  } catch (error) {
    console.error("Error during app initialization:", error);
  }
})();
const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={firstRoute}>
      <Stack.Screen name={AuthRoutes.Welcome} component={WelcomeScreen} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name={AuthRoutes.LoginMethod} component={LoginMethodScreen} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name={AuthRoutes.Login} component={LoginScreen} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name={AuthRoutes.SignUp} component={SignUpScreen} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name={AuthRoutes.MainNavigationBar} component={MainNavigationBar} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name={AuthRoutes.HitAnime} component={HitAnime} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name={AuthRoutes.NewEpisodeReleases} component={NewEpisodeReleases} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name={AuthRoutes.Notification} component={Notification} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name={AuthRoutes.SearchAnime} component={SearchAnime} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name={AuthRoutes.Filter} component={Filter} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name={AuthRoutes.AnimeDetails} component={AnimeDetails} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name={AuthRoutes.CommentsScreens} component={CommentsScreens} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name={AuthRoutes.VideoPlayScreen} component={VideoPlayScreen} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name={AuthRoutes.ResetWelcome} component={ResetWelcome} options={{ headerShown: false }}></Stack.Screen>
    </Stack.Navigator>
  )
}
export { AuthNavigator }