import React, { useEffect, useState } from "react";
import{View ,Text, SafeAreaView, StyleSheet, Dimensions} from "react-native"
import { Image } from "react-native-elements";
import { logo } from "../../common/Images";
import fontSizes from "../../common/FontSizes";
import fontFamily from "../../common/FontFamily";
import { Color } from "../../common/Colors";
import NavigationProfile from "../../common/component/NavigationProfile";
import { UserReponseViewModel } from "../../ModelView";
import { apiUser } from "../../apiService/UserService";
import getUserIdFromToken from "../../utils/getUserId";

const{width,height}=Dimensions.get("window");

const ProfileScreen = () =>{
    const[user,setUser] = useState<UserReponseViewModel>();
    useEffect(()=>{
        const fetData = async ()=>{
            try {
                const resultUser = await apiUser.getUserProfile(await getUserIdFromToken())
                setUser(resultUser)
            } catch (error) {
                console.log(error)
            }
        }
        fetData();
    },[])

    return(
       <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Image source={logo} style={styles.logoHeader}></Image>
            <Text style={styles.contentHeader}>Profile</Text>
        </View>
        <View style={styles.profile}>
            <Image source={{uri:user?.AvatarUrl}} style={styles.avatar} ></Image>
            <View style={styles.contentProfile}>
                 <Text style={styles.name}>{user?.FullName==null?"Chưa có tên":user.FullName}</Text>
                 <Text style={styles.email}>{user?.Email}</Text>
            </View>
           
        </View>
        <NavigationProfile
        title="Edit Profile"
        iconName="user"
        />
        <NavigationProfile
        title="Notification"
        iconName="bell"
        />
        <NavigationProfile
        title="Language"
        iconName="language"
        />
        <NavigationProfile
        title="Logout"
        iconName="log-out"//Entypo
        isLogout={true}
        />
       </SafeAreaView>
    )

}

export default ProfileScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Color.SecondaryColor,
    },
    header:{
        flex:0.1,
        backgroundColor:Color.SecondaryColor,
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:'center',
        
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
        marginVertical:10,
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
        backgroundColor:Color.SecondaryColor,
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