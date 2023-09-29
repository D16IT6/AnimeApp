import { NativeStackScreenProps } from "@react-navigation/native-stack";
export type AuthStackParamList = {
    Welcome: undefined;
    SignUp: undefined;
    Login: undefined;
    LoginMethod: undefined
};
type AuthScreenNavigationProps = NativeStackScreenProps<
    AuthStackParamList,
    WelcomeScreen,
    SignUpScreen,
    LoginScreen,
    LoginMethodScreen,
>

 export { AuthScreenNavigationProps, AuthStackParamList };
