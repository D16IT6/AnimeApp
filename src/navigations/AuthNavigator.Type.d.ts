import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type HomeStackNavigatorPararamList = {
    Welcome: undefined;
    SignUp: undefined;
    Login: undefined;
    LoginMethod: undefined
};

export type HomeScreenNavigationProp = NativeStackScreenProps<
    HomeStackNavigatorPararamList,
    WelcomeScreen,
    SignUpScreen,
    LoginScreen,
    LoginMethodScreen
>