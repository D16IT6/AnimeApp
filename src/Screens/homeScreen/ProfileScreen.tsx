import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, Dimensions } from "react-native"
import { Image } from "react-native-elements";
import { logo } from "../../common/Images";
import fontSizes from "../../common/FontSizes";
import fontFamily from "../../common/FontFamily";
import { Color } from "../../common/Colors";
import NavigationProfile from "../../common/component/NavigationProfile";
import { UserReponseViewModel } from "../../ModelView";
import { apiUser } from "../../apiService/UserService";
import getUserIdFromToken from "../../utils/getUserId";
import { AxiosError } from "axios";
import { imageError } from "../../utils/httpReponse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { AuthRoutes, AuthScreenNavigationProps } from "../../navigations/AuthNavigator";
import LoadScreen from "../loadScreens/loadScreens";

const { width, height } = Dimensions.get("window");

const ProfileScreen = () => {
    const navigation = useNavigation<AuthScreenNavigationProps>();
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<UserReponseViewModel>();
    useEffect(() => {
        const fetData = async () => {
            try {
                const resultUser = await apiUser.getUserProfile(await getUserIdFromToken())
                setUser(resultUser)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetData();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
             <LoadScreen
                visible={loading}
                title="Đang tải thông tin cá nhân"
                 />
            <View style={styles.header}>
                <Image source={logo} style={styles.logoHeader}></Image>
                <Text style={styles.contentHeader}>Profile</Text>
            </View>
            <View style={styles.profile}>
                <Image source={{ uri: user?.AvatarUrl ?? imageError }} style={styles.avatar} ></Image>
                <View style={styles.contentProfile}>
                    <Text style={styles.name}>{user?.FullName == null ? "Chưa có tên" : user.FullName}</Text>
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
                title="Ngôn ngữ"
                iconName="language"
            />
            <NavigationProfile
                title="Đăng xuất"
                iconName="log-out"//Entypo
                isLogout={true}
                press={() => {
                    AsyncStorage.removeItem("AccessToken")
                    AsyncStorage.removeItem("RefreshToken")
                    navigation.navigate(AuthRoutes.Login)
                }}

            />
        </SafeAreaView>
    )

}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.SecondaryColor,
    },
    header: {
        flex: 0.1,
        backgroundColor: Color.SecondaryColor,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: 'center',

    },
    logoHeader: {
        height: width * 0.1,
        width: width * 0.1,
        marginHorizontal: 20
    },
    contentHeader: {
        fontSize: fontSizes.h2,
        fontFamily: fontFamily.PrimaryFont,
        fontWeight: "bold",
        color: Color.Black
    },
    profile: {
        marginVertical: 10,
        flex: 0.2,
        backgroundColor: Color.SecondaryColor,
        flexDirection: "row",
        alignItems: "center"
    },
    avatar: {
        width: width * 0.25,
        height: width * 0.25,
        borderRadius: 100,
        marginHorizontal: 20
    },
    contentProfile: {
        backgroundColor: Color.SecondaryColor,
        flex: 1,
        height: "80%",
        justifyContent: "center"
    },
    name: {
        fontSize: fontSizes.h2,
        fontFamily: fontFamily.PrimaryFont,
        fontWeight: "bold",
        color: Color.Black
    },
    email: {
        fontSize: fontSizes.h4,
        fontFamily: fontFamily.PrimaryFont,
        fontWeight: "500",
        color: Color.Black
    }
})