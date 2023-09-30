import { useNavigation } from "@react-navigation/native"
import React from "react"
import { Button, Text, TouchableOpacity, View } from "react-native"
import { AccountSetupRoutes, AccountSetupScreenNavigationProps } from "../../navigations/AccountSetupNavigator"

const ChooseInterestScreen = () => {
    const navigation = useNavigation<AccountSetupScreenNavigationProps>();

    return (
        <View>
            <Text>Choose Interest Screen</Text>
            <TouchableOpacity onPress={
                () => {
                    navigation.navigate(AccountSetupRoutes.Profile)
                }
            }>
                <Text>Chuyển screen</Text>
            </TouchableOpacity>
        </View >
    )
}
export { ChooseInterestScreen }