import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AccountSetupScreenNavigationProps, AccountSetupRoutes } from "../AccountSetupNavigator";
import { ChooseInterestScreen, ProfileScreen } from "../../screens/accountSetupScreens";

const AccountSetupNavigator = () => {

    const AccountSetupStack = createNativeStackNavigator<AccountSetupScreenNavigationProps>();
    return (

        <AccountSetupStack.Navigator screenOptions={
            {
                headerShown: false
            }
        }>
            <AccountSetupStack.Screen
                name={AccountSetupRoutes.ChooseInterest}
                component={ChooseInterestScreen}
                options={{
                    headerShown: false
                }}
            ></AccountSetupStack.Screen>

            <AccountSetupStack.Screen
                name={AccountSetupRoutes.Profile}
                component={ProfileScreen}
            ></AccountSetupStack.Screen>

        </AccountSetupStack.Navigator>
    )
}
export { AccountSetupNavigator }