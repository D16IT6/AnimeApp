import React from "react";
import { Text, View, TouchableOpacity, ImageBackground, SafeAreaView } from "react-native";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Login } from "./index";
import { HomeScreenNavigationProp } from "../type";

const Welcome = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    return(
        
        <View style={{
            
           flex:1
        }}>
            <ImageBackground source={require('../assets/image/backgroudwelcome1png.png')}
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
                        () => navigation.navigate("Login")}
                >
                    <Text>
                        Get Started
                    </Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
        
    )
}

export default Welcome