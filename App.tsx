import React from 'react';
import { AuthNavigator } from './src/navigations/AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';
const App = () => {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
   
  )
}
export { App };
