import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createStackNavigator } from '@react-navigation/stack';
import { AccountSetupRoutes } from "./Routes";
import { RouteProp } from "@react-navigation/native";

type ProfileNavigateParams = {
    selectedCategories: number[]
}
type AccountSetupStackParamList = {
    ChooseInterest: undefined;
    Profile: ProfileNavigateParams;
};
type ProfileScreenRouteProps = RouteProp<AccountSetupStackParamList, AccountSetupRoutes.Profile>

type AccountSetupScreenNavigationProps =
    NativeStackScreenProps<
        AccountSetupStackParamList,
        ChooseInterestScreen,
        ProfileScreen,
        FakeScreen
    >

export { AccountSetupScreenNavigationProps, AccountSetupStackParamList, ProfileScreenRouteProps };
