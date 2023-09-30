import React from 'react';
import { AuthNavigator } from './src/navigations/AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AccountSetupNavigator } from './src/navigations/AccountSetupNavigator';



const App = () => {
  return (

    <NavigationContainer>
      {/* <AuthNavigator /> */}
      <AccountSetupNavigator/>
    </NavigationContainer>
  )
}

export { App };
