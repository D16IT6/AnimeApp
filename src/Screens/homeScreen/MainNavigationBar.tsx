import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { AuthRoutes, AuthScreenNavigationProps } from "../../navigations/AuthNavigator";
import {HomeScreen,MyListSreen} from "../homeScreen";
import Ionicons from "react-native-vector-icons/Ionicons"
import ProfileScreen from "./ProfileScreen";
import { Color } from "../../common/Colors";
const Tab = createBottomTabNavigator();
const MainNavigationBar = ()=>{
    
   const tabOffsetValue = useRef(new Animated.Value(0)).current
  // const navigation = useNavigation();
  //  useEffect(() => {
  //   const unsubscribe = navigation.addListener('tabPress', (e) => {
  //     // Thực hiện các công việc tải lại dữ liệu ở đây khi chuyển đổi màn hình
  //     console.log('Reload data here');
  //   });

  //   return unsubscribe;
  // }, [navigation]);
    return(
       <View style={{flex:1}}>
    <Tab.Navigator 
    initialRouteName={AuthRoutes.HomeScreen}
   
    screenOptions={({ route }) => ({
      tabBarShowLabel:false,
      tabBarStyle:{
        backgroundColor:Color.SecondaryColor,
        position:'absolute',
        bottom:15,
        marginHorizontal:10,
        height:60,
        borderRadius:10,
        shadowColor:"#000",
        shadowOpacity:0.08,
        shadowOffset:{
          width:10,
          height:10
        }
        
      },
        tabBarIcon: ({ focused }) => {
          let size = focused ? 30:25
          let color = focused ? Color.PrimaryColor:'#808080'
          let iconName;
          let rn =route.name;
          if (rn === 'home') {
            iconName = focused? 'home': 'home';
            
          } else if (rn === 'mylist') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
            
          }
          else if (rn === 'profile') {
            iconName = focused ? 'person-add-sharp' : 'person';
          }
          // You can return any component that you like here!
          return iconName ? <Ionicons name={iconName} size={size} color={color} /> : null;
        },
        tabBarActiveTintColor: Color.PrimaryColor,
        tabBarInactiveTintColor: 'gray',
      })}   
    >     
        <Tab.Screen name={"home"} component={HomeScreen} 
        options={{ headerShown: false }}
        listeners={({navigation,route})=>({
          tabPress:e=>{
            Animated.spring(tabOffsetValue,{
              toValue:0,
              useNativeDriver:true,
            }).start()
          }
         })}
        ></Tab.Screen>
        <Tab.Screen name={"mylist"} component={MyListSreen} options={{ headerShown: false , tabBarBadge: 3}}
         listeners={({navigation,route})=>({
          tabPress:e=>{
            Animated.spring(tabOffsetValue,{
              toValue:GetWidth(),
              useNativeDriver:true,
            }).start()
          }
         })}
        ></Tab.Screen>
        <Tab.Screen name={"profile"} component={ProfileScreen} options={{ headerShown: false }}
        
        listeners={({navigation,route})=>({
          tabPress:e=>{
            Animated.spring(tabOffsetValue,{
              toValue:GetWidth()*2,
              useNativeDriver:true,
            }).start()
          }
         })}
         ></Tab.Screen>
    </Tab.Navigator>
     <Animated.View style={[styles.Animatied,{ transform:[{translateX:tabOffsetValue}]}]}></Animated.View>
     </View>
    )
}
function GetWidth(){
  let width =Dimensions.get("window").width
  width=width- 20
  return width/3
}
export default MainNavigationBar

const styles = StyleSheet.create({
  Animatied:{
    backgroundColor:Color.PrimaryColor,
    width:GetWidth()-50,
    height:3,
    position:'absolute',
    bottom:73,
    left:10+25,
    borderRadius:100,
    zIndex:10
  }
})