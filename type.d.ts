import type { NativeStackScreenProps } from "@react-navigation/native-stack";
export type HomeStackNavigatorPararamList={
    Welcome:undefined;
    SignUp:undefined;
    Login:undefined;
};

export type HomeScreenNavigationProp=NativeStackScreenProps<
HomeStackNavigatorPararamList,
Welcome,
SignUp,
Login
>