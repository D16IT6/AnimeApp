import { useNavigation } from "@react-navigation/native";
import { AuthScreenNavigationProps } from "../../navigations/AuthNavigator/Type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthRoutes } from "../../navigations/AuthNavigator";
import refreshAccessToken from "../../utils/RefreshToken";
import { Alert } from "react-native";

const useCustomNavigation = () => {

    const navigation = useNavigation<AuthScreenNavigationProps>();

    const overrideNavigate = async (routeName: string, options?: any) => {

        await refreshAccessToken();

        const needLogin = await AsyncStorage.getItem("NeedLogin");

        console.log('need login: ', needLogin);

        if (needLogin === "true") {
            console.log("Buộc phải đăng nhập lại")
            navigation.navigate(AuthRoutes.Login);
        }
        else {
            navigation.navigate(routeName, options);
        }
    };
    const overridePush = async (routeName: string, options?: any) => {

        await refreshAccessToken();

        const needLogin = await AsyncStorage.getItem("NeedLogin");

        console.log('need login: ', needLogin);

        if (needLogin === "true") {
            navigation.navigate(AuthRoutes.Login);

        }
        else {
            navigation.push(routeName, options);
        }
    };

    return { ...navigation, navigate: overrideNavigate, push: overridePush };
};
export default useCustomNavigation;
