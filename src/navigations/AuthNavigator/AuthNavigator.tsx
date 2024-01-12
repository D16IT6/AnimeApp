import React, { useLayoutEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { WelcomeScreen, LoginScreen, SignUpScreen, LoginMethodScreen, ResetWelcome, ForgotPasswordScreen } from '../../Screens/AuthScreens'
import { MainNavigationBar, HitAnime, Notification, Filter, SearchAnime, NewEpisodeReleases } from '../../Screens/homeScreen'
import { AuthScreenNavigationProps } from "./Type"
import { AuthRoutes } from './Routes'
import { getItem, setItem } from '../../utils/asyncStorage'
import { AnimeDetails, CommentsScreens, VideoPlayScreen } from '../../Screens/animeDetailsScreens'
import { AccountInfo, ChooseInterestScreen } from '../../Screens/accountSetupScreens'
import AsyncStorage from '@react-native-async-storage/async-storage';
import shouldRefreshToken from '../../utils/shoudRefreshToken'
import refreshAccessToken from '../../utils/RefreshToken'

const Stack = createNativeStackNavigator<AuthScreenNavigationProps>();

const AuthNavigator = () => {
  const getAccessToken = async (): Promise<string | undefined | null> => {
    return await getItem("AccessToken");
  };
  const [firstRoute, setFirstRoute] = useState<string | undefined>();
  const [showWelcome, setWelcome] = useState<boolean | null>(null);
  const [isLoading, setLoading] = useState(true);

  useLayoutEffect(() => {
    const checkIfAlreadyWelcomed = async () => {
      let welcomed = await getItem('welcomed');
      console.log(welcomed);
      const token = await getAccessToken();
      console.log(token)
      if (welcomed === '1') {
        setWelcome(false);

        // await refreshAccessToken();

        if (token === null || token === undefined || (await AsyncStorage.getItem("NeedLogin")) === "true") {
          console.log("vào login")
          setFirstRoute(AuthRoutes.Login);
        }
        else {
          console.log("vào main")
          setFirstRoute(AuthRoutes.MainNavigationBar);
        }
      } else {
        setWelcome(true);
        setFirstRoute(AuthRoutes.Welcome);
      }


      setLoading(false); // Đánh dấu tác vụ đã hoàn thành
    };

    checkIfAlreadyWelcomed();
  }, []);

  // Các useEffect khác

  if (isLoading) {
    return null; // Hoặc bạn có thể hiển thị một Spinner component trong quá trình loading
  }
  console.log("man hinh", firstRoute)
  return (
    <Stack.Navigator initialRouteName={firstRoute}>
      <Stack.Screen name={AuthRoutes.Welcome} component={WelcomeScreen} options={{ headerShown: false }} key={AuthRoutes.Welcome}></Stack.Screen>

      <Stack.Screen name={AuthRoutes.AccountInfoScreen} component={AccountInfo} options={{ headerShown: false }} key={AuthRoutes.AccountInfoScreen}></Stack.Screen>
      <Stack.Screen name={AuthRoutes.ChooseInsterestScreen} component={ChooseInterestScreen} options={{ headerShown: false }} key={AuthRoutes.ChooseInsterestScreen}></Stack.Screen>

      <Stack.Screen name={AuthRoutes.LoginMethod} component={LoginMethodScreen} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name={AuthRoutes.Login} component={LoginScreen} options={{ headerShown: false }} key={AuthRoutes.Login}></Stack.Screen>
      <Stack.Screen name={AuthRoutes.ForgotPasswordScreen} component={ForgotPasswordScreen} options={{ headerShown: false }} ></Stack.Screen>
      <Stack.Screen name={AuthRoutes.SignUp} component={SignUpScreen} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name={AuthRoutes.MainNavigationBar} component={MainNavigationBar} options={{ headerShown: false }} key={AuthRoutes.MainNavigationBar}></Stack.Screen>
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