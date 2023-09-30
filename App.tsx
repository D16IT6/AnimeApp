/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {AuthNavigator} from './src/navigations/AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';



const App = () =>
{
  return (
  
    <NavigationContainer>
      <AuthNavigator/>
    </NavigationContainer>
)
}

export { App };
