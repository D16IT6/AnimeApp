import { useNavigation } from "@react-navigation/native"
import React from "react"
import { Button, Text, TouchableOpacity, View } from "react-native"
import { AccountSetupRoutes, AccountSetupScreenNavigationProps } from "../../navigations/AccountSetupNavigator"

const ProfileScreen = () =>
{
    const navigation = useNavigation<AccountSetupScreenNavigationProps>();
    return (
        <View>
            <Text>Profile Screen</Text>
            <TouchableOpacity onPress={
                () => {
                    navigation.navigate(AccountSetupRoutes.ChooseInterest)
                }
            }>
                <Text>Quay về</Text>
            </TouchableOpacity>
        </View>
 
    )
}
export {ProfileScreen}