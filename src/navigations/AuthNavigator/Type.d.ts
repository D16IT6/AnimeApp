import { NativeStackScreenProps } from "@react-navigation/native-stack";
export type AuthStackParamList = {
    Welcome: undefined;
    SignUp: undefined;
    Login: undefined;
    LoginMethod: undefined;
    ResetWelcome:undefined;
    Home:undefined;
    MainNavigationBar:undefined;
    MyListSreen:undefined;
    ProfileScreen:undefined,
    HitAnime:undefined,
    NewEpisodeReleases:undefined,
    Notification:undefined,
    SearchAnime:undefined,
    Filter:undefined,
    AnimeDetails:undefined,
    CommentsScreens:undefined,
    VideoPlayScreen:undefined
};
type AuthScreenNavigationProps = NativeStackScreenProps<
    AuthStackParamList,
    WelcomeScreen,
    SignUpScreen,
    LoginScreen,
    LoginMethodScreen,
    ResetWelcome,
    HomeScreen,
    MainNavigationBar,
    MyListSreen,
    ProfileScreen,
    HitAnime ,
    NewEpisodeReleases,
    Notification,
    SearchAnime,
    Filter,
    AnimeDetails,
    CommentsScreens,
    VideoPlayScreen
>
 export { AuthScreenNavigationProps, AuthStackParamList };
