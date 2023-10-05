import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { Alert, Image, StyleSheet, View, TouchableOpacity, ScrollView, Text } from 'react-native';
import { AccountSetupRoutes, AccountSetupScreenNavigationProps, AccountSetupStackParamList } from "../../navigations/AccountSetupNavigator"
import { ProfileScreenRouteProps } from "../../navigations/AccountSetupNavigator/Type";
import { FooterNavigation, NavigationBar } from "../../common/components";
import { Avatar, ChooseImage, NoAvatar } from "../../common/Images";
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker'
import { facebookIcon, googleIcon } from "../../common/Icons";
import SimpleInput from "../../common/components/SimpleInput";
const hostUrl = 'http://10.0.2.2:1234/';
const apiUrl = hostUrl + 'image';

const defaultAvatar = 'http://10.0.2.2:1234/uploads/defaultavatar.png';

const ProfileScreen = ({ route }: { route: ProfileScreenRouteProps }) => {
    const [avatar, setAvatar] = useState(defaultAvatar)
    const navigation = useNavigation<AccountSetupScreenNavigationProps>();
    const event = {
        updateAvatar: (avatarPath: string) => {
            const avatarUrl = hostUrl + avatarPath.replace('\\', '/')
            setAvatar(avatarUrl)
        },
        uploadImage: async (data: DocumentPickerResponse) => {
            let formData = new FormData();
            formData.append('image', data);

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData,
                });

                if (response.ok) {
                    const result = await response.json();
                    const avatarPath = result.value.filePath;
                    event.updateAvatar(avatarPath)


                } else {
                    console.error('Upload failed:', response.statusText);
                }
            } catch (err) {
                console.error('Error:', err);
            }
        },

        pickImage: async () => {
            try {
                const data = await DocumentPicker.pickSingle({
                    type: [DocumentPicker.types.images]
                });
                console.log(data);
                await event.uploadImage(data);
            }
            catch (err) {
                if (DocumentPicker.isCancel(err)) {
                    console.log("User cancel upload " + err);
                }
                else {
                    console.log("Error" + err);
                }
            }
        }
    }
    return (
        <View style={style.container}>
            <NavigationBar flex={1} title="Fill your profile" onPress={() => {
                navigation.navigate(AccountSetupRoutes.ChooseInterest)
            }} />
            <View style={style.content}>
                <View style={style.contentAvatar}>
                    <Image source={{
                        uri: avatar
                    }}
                        style={style.contentAvatarImage} />
                    <TouchableOpacity style={style.contentAvatarBrowse} onPress={() => {
                        event.pickImage()
                    }}>
                        <Image source={ChooseImage} />
                    </TouchableOpacity>
                </View>

                <View style={style.contentInfo}>
                    <SimpleInput viewStyle={{
                        marginBottom: 10
                    }} placeholder={"Họ"} password={false} onFocus={() => { }} onChangeText={function (text: string): void {

                    }} />
                    <SimpleInput viewStyle={{
                        marginBottom: 10
                    }} placeholder={"Tên"} password={false} onFocus={() => { }} onChangeText={function (text: string): void {

                    }} />

                    <SimpleInput viewStyle={{
                        marginBottom: 10
                    }} placeholder={"Email"} password={false} onFocus={() => { }} onChangeText={function (text: string): void {

                    }} />

                    <SimpleInput viewStyle={{
                        marginBottom: 10
                    }} placeholder={"Số điện thoại"} password={false} onFocus={() => { }} onChangeText={function (text: string): void {

                    }} />
                </View>
                <FooterNavigation flex={1} leftTitle="Skip" rightTitle="Continue" />

            </View>
        </View>
    );
};
const style = StyleSheet.create({
    container:
    {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'white'
    },
    content:
    {
        flex: 12,
        marginVertical: 10,
        // justifyContent: 'center',
        // backgroundColor:'red'


    },
    contentAvatar: {
        flex: 3,
        //  backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentAvatarImage: {
        //  backgroundColor: 'blue',
        width: 180,
        height: 180,
        // borderWidth:10,
        borderRadius: 100

    },
    contentAvatarBrowse:
    {
        position: 'absolute',
        top: 145,
        left: 215

    },
    contentInfo: {
        flex: 7,
        // backgroundColor: 'green'

    }
})
export { ProfileScreen }