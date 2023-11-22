import React from "react";
import{View ,Text, SafeAreaView, StyleSheet, Dimensions} from "react-native"
import { Image } from "react-native-elements";
import { logo } from "../../common/Images";
import fontSizes from "../../common/FontSizes";
import fontFamily from "../../common/FontFamily";
import { Color } from "../../common/Colors";
import NavigationProfile from "../../common/component/NavigationProfile";

const{width,height}=Dimensions.get("window");

const ProfileScreen = () =>{
    return(
       <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Image source={logo} style={styles.logoHeader}></Image>
            <Text style={styles.contentHeader}>Profile</Text>
        </View>
        <View style={styles.profile}>
            <Image source={require("../../assets/images/aot.png")} style={styles.avatar} ></Image>
            <View style={styles.contentProfile}>
                 <Text style={styles.name}>Andrew Ainsley</Text>
                 <Text style={styles.email}>andrew_ainsley@yourdomain.com</Text>
            </View>
           
        </View>
        <NavigationProfile
        title="Edit Profile"
        iconName=""
        />
        <NavigationProfile
        title="Notification"
        iconName=""
        />
        <NavigationProfile
        title="Language"
        iconName=""
        />
        <NavigationProfile
        title="Logout"
        iconName=""
        isLogout={true}
        />
       </SafeAreaView>
    )

}

export default ProfileScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"red",
    },
    header:{
        flex:0.07,
        backgroundColor:Color.SecondaryColor,
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:'center'
    },
    logoHeader:{
      height:width*0.1,
      width:width*0.1,
      marginHorizontal:20
    },
    contentHeader:{
        fontSize:fontSizes.h2,
        fontFamily:fontFamily.PrimaryFont,
        fontWeight:"bold",
        color:Color.Black
    },
    profile:{
        flex:0.2,
        backgroundColor:Color.SecondaryColor,
        flexDirection:"row",
        alignItems:"center"
    },
    avatar:{
        width:width*0.25,
        height:width*0.25,
        borderRadius:100,
        marginHorizontal:20
    },
    contentProfile:{
        backgroundColor:'red',
        flex:1,
        height:"80%",
        justifyContent:"center"
    },
    name:{
        fontSize:fontSizes.h2,
        fontFamily:fontFamily.PrimaryFont,
        fontWeight:"bold",
        color:Color.Black
    },
    email:{
        fontSize:fontSizes.h4,
        fontFamily:fontFamily.PrimaryFont,
        fontWeight:"500",
        color:Color.Black
    }
})