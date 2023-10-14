import React from "react";
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { AuthRoutes, AuthScreenNavigationProps } from "../../navigations/AuthNavigator";
import {HomeScreen,MyListSreen} from "../homeScreen";
import Ionicons from "react-native-vector-icons/Ionicons"
import ProfileScreen from "./ProfileScreen";
const Tab = createBottomTabNavigator();
const MainNavigationBar = ()=>{
    return(
    <Tab.Navigator initialRouteName={AuthRoutes.HomeScreen}
    screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
            let rn =route.name;

          if (rn === 'home') {
            iconName = focused
              ? 'home'
              : 'home';
          } else if (rn === 'mylist') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
            
          }
          else if (rn === 'profile') {
            iconName = focused ? 'person' : 'person-add-sharp';
          }
          // You can return any component that you like here!
          return iconName ? <Ionicons name={iconName} size={size} color={color} /> : null;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >     
        <Tab.Screen name={"home"} component={HomeScreen} options={{ headerShown: false }}></Tab.Screen>
        <Tab.Screen name={"mylist"} component={MyListSreen} options={{ headerShown: false }}></Tab.Screen>
        <Tab.Screen name={"profile"} component={ProfileScreen} options={{ headerShown: false }}></Tab.Screen>
    </Tab.Navigator>
    )
}

export default MainNavigationBar