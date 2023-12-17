import { useNavigation } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { Image, StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { FooterNavigation, InputAuthScreen, NavigationBar } from "../../common/components";
import { ChooseImage } from "../../common/Images";
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker'
import { apiUser } from "../../apiService/UserService";
import getUserIdFromToken from "../../utils/getUserId";
import { UserPostViewModel, UserReponseViewModel } from "../../ModelView";
import { AuthRoutes } from "../../navigations/AuthNavigator";
import { imageError } from "../../utils/httpReponse";


const AccountInfo = () => {



    const [avatar, setAvatar] = useState<string | undefined>(imageError)
    const [fullName, setFullname] = useState<string | undefined>();
    const [email, setEmail] = useState<string | undefined>();
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>();
    const [newImage, setNewImage] = useState<DocumentPickerResponse>();
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resultUser: UserReponseViewModel | undefined = await apiUser.getUserProfile(await getUserIdFromToken())
                console.log(resultUser);
                setAvatar(_ => resultUser?.AvatarUrl)
                setFullname(_ => resultUser?.FullName)
                setEmail(_ => resultUser?.Email)
                setPhoneNumber(_ => resultUser?.PhoneNumber)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    const event = {
        pickImage: async () => {
            try {
                const data = await DocumentPicker.pickSingle({
                    type: [DocumentPicker.types.images]
                });
                setNewImage(data);
                setAvatar(data.uri);
            }
            catch (err) {
                if (DocumentPicker.isCancel(err)) {
                    console.log("User cancel upload " + err);
                }
                else {
                    console.log("Error" + err);
                }
            }
        },


    }

    return (
        <View style={style.container}>
            <NavigationBar flex={1} title="Thông tin cá nhân" onPress={() => {
                navigation.goBack()

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
                    <InputAuthScreen
                        placeholder=""
                        iconName="user"
                        password={false}
                        value={fullName}
                        onFocus={() => {
                        }} onChangeText={function (text: string): void {
                            console.log(text);
                            setFullname(_ => text)
                        }} />

                    <InputAuthScreen
                        placeholder=""
                        iconName="phone"
                        password={false}
                        value={phoneNumber}
                        onFocus={() => {
                        }} onChangeText={function (text: string): void {
                            setPhoneNumber(_ => text)
                        }} />

                    <InputAuthScreen
                        placeholder=""
                        iconName="phone"
                        password={false}
                        value={email}
                        onFocus={() => {
                        }} onChangeText={function (text: string): void {
                            setEmail(_ => text)
                        }} />
                </View>
                <FooterNavigation flex={1} leftTitle="Bỏ qua" rightTitle="Cập nhật"
                    rightEvent={async () => {
                        const model: UserPostViewModel = {
                            FullName: fullName,
                            Email: email,
                            PhoneNumber: phoneNumber
                        }
                        console.log('model');
                        console.log(model);
                        var res = await apiUser.updateProfile(model);
                        if (res) {
                            Alert.alert('thông báo', 'Cập nhật thông tin thành công');
                            navigation.goBack();
                        }
                        else {
                            Alert.alert('thông báo', 'Có lỗi xảy ra');

                        }
                    }}

                />

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
export { AccountInfo }