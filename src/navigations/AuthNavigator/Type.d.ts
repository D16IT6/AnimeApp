import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthRoutes } from "./Routes";
import { AnimeDetailParams, AnimeSearchParams, CommentParams, AccountInfoRouteProps } from "../../ViewModel";
import { RouteProp } from "@react-navigation/native";
export type AuthStackParamList = {
    Welcome: undefined;
    SignUp: undefined;
    Login: undefined;
    LoginMethod: undefined;
    ResetWelcome: undefined;
    Home: undefined;
    MainNavigationBar: undefined;
    MyListSreen: undefined;
    ProfileScreen: undefined,
    HitAnime: undefined,
    NewEpisodeReleases: undefined,
    Notification: undefined,
    SearchAnime: AnimeSearchParams,
    Filter: undefined,
    AnimeDetails: AnimeDetailParams,
    CommentsScreens: CommentParams,
    VideoPlayScreen: undefined,
    AccountInfoScreen: undefined,
    ForgotPasswordScreen:undefined
};

type SearchAnimeRouteProps = RouteProp<AuthStackParamList, AuthRoutes.SearchAnime>

type AnimeDetailRouteProps = RouteProp<AuthStackParamList, AuthRoutes.AnimeDetails>


type CommentsRouteProps = RouteProp<AuthStackParamList, AuthRoutes.CommentsScreens>

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
    HitAnime,
    NewEpisodeReleases,
    Notification,
    SearchAnime,
    Filter,
    AnimeDetails,
    CommentsScreens,
    VideoPlayScreen,
    ForgotPasswordScreen
>
export {
    AuthScreenNavigationProps,
    AuthStackParamList,
    SearchAnimeRouteProps,
    AnimeDetailRouteProps,
    CommentsRouteProps,
};
