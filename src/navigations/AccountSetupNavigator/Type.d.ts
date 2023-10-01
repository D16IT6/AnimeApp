import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createStackNavigator } from '@react-navigation/stack';
import { AccountSetupRoutes } from "./Routes";

type AccountSetupStackParamList = {
    ChooseInterest: undefined;
    Profile: undefined;
};
type AccountSetupScreenNavigationProps =
    NativeStackScreenProps<
        AccountSetupStackParamList,
        ChooseInterestScreen,
        ProfileScreen,
        FakeScreen
    >

export { AccountSetupScreenNavigationProps, AccountSetupStackParamList };
