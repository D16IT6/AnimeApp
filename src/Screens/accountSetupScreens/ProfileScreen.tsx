import { useNavigation } from "@react-navigation/native"
import React from "react"
import { RouteProp } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from "react-native"
import { AccountSetupRoutes, AccountSetupScreenNavigationProps, AccountSetupStackParamList } from "../../navigations/AccountSetupNavigator"
import { ProfileScreenRouteProps } from "../../navigations/AccountSetupNavigator/Type";

const ProfileScreen = ({ route }:{ route: ProfileScreenRouteProps }) => {
    console.log(route.params.selectedCategories);
    const navigation = useNavigation<AccountSetupScreenNavigationProps>();

    return (
        <View>
            <Text>Profile Screen</Text>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate(AccountSetupRoutes.ChooseInterest, {
                        a: 120,
                    });
                }}
            >
                <Text>Quay về</Text>
            </TouchableOpacity>
        </View>
    );
};

export { ProfileScreen }