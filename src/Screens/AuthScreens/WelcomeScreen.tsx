import React from "react";
import { Text, View, TouchableOpacity, ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LoginScreen } from "./index";
import { HomeScreenNavigationProp } from '../../navigations/AuthNavigator.Type';
import { backgroundImage } from "../../constants/images";
const WelcomeScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    
    return(
        
        <View style={{
            
           flex:1
        }}>
            <ImageBackground source={backgroundImage}
            style={{
            
                flex:1
             }} >
                <Text style={{
                    fontSize: 30,
                    color: "white"
                }}>Welcome to Animax</Text>
                <Text>The best streaming anime app of the century to entertain you every day</Text>
                <TouchableOpacity
                    style={{
                        backgroundColor:'red',
                        marginHorizontal:80,
                    }}
                    onPress={
                        () => navigation.navigate("LoginScreen")}
                >
                    <Text>
                        Get Started
                    </Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
        
    )
}
const style =StyleSheet.create({
    container:{
        flex:1
    }
})
export default WelcomeScreen
