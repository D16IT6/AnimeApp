import React from "react";
import{View ,Text, StyleSheet, ImageBackground,Image, Dimensions, TouchableOpacity} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { AuthRoutes, AuthScreenNavigationProps } from "../../navigations/AuthNavigator";
import { LoginScreen, ResetWelcome } from "../AuthScreens";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome"
import { SafeAreaView } from "react-native-safe-area-context";
const Tab = createBottomTabNavigator();
const anime = {
    id:1,
    avatar:'../../assets/images/demon_slayder.png',
    title:'Demon Slayer: Kimetsu ',
    category:'Action, Shounen, Martial Arts, Adventure, ...'
}
const {width,height} =Dimensions.get('window')
const HomeScreen = () =>{
    return(
        <SafeAreaView style={styles.container}>
            
            
                <ImageBackground source={require('../../assets/images/demon_slayder.png')} style={styles.top} >
                    <View style={styles.topheader}>
                        <Image source={require('../../assets/images/logo.png')} style={styles.topLogo} resizeMode="contain"></Image>
                        <View style={styles.topTools}>
                            <Ionicons name="search" color={'#fff'} size={25}></Ionicons>
                            <FontAwesomeIcons name="bell" color={'#fff'} size={25}></FontAwesomeIcons>
                        </View>
                    </View>
                    
                    <View style={styles.topContent}>
                        <Text>
                            Demon Slayer: Kimetsu ...
                        </Text>
                        <Text>Action, Shounen, Martial Arts, Adventure, ...</Text>
                        <TouchableOpacity>
                            <Ionicons name="caret-forward-circle" color={'#fff'} size={10}></Ionicons>
                            <Text>Play</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="add" color={'#fff'} size={10}></Ionicons>
                            <Text>MyList</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                
            
            <View style={styles.hitanime}>
                <Text>helo</Text>
            </View>
            <View style={styles.New_Episode_Releases}>
                
            </View>
        </SafeAreaView>
    )

}

export default HomeScreen

const styles=StyleSheet.create({
    container:{
        flex:1
    },
    top:{
        flex:4,
        backgroundColor:'red',
        
    },
    topheader:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    topLogo:{
        marginLeft:20,
        marginTop:20,
         width:width*0.1,
         height:height*0.05,
         backgroundColor:'green',
    },
    topTools:{
        backgroundColor:'green',
        flexDirection:'row',
        width:width*0.2,
        justifyContent:"space-around",
        height:height*0.05,
        alignItems:'center',
        marginRight:20,
        marginTop:20
    },
    topContent:{
        backgroundColor:'yellow',
        flex:1
    },
    hitanime:{
        flex:3,
        backgroundColor:'blue'
    },
    New_Episode_Releases:{
        flex:3,
        backgroundColor:'yellow'
    },

})