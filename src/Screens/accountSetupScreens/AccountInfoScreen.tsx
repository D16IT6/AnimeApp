import { useNavigation } from "@react-navigation/native"
import React, { useEffect, useRef, useState } from "react"
import { Image, StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { FooterNavigation, InputAuthScreen, NavigationBar } from "../../common/components";
import { ChooseImage } from "../../common/Images";
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker'
import { apiUser } from "../../apiService/UserService";
import getUserIdFromToken from "../../utils/getUserId";
import { UserPostViewModel, UserReponseViewModel } from "../../ViewModel";
import { AuthRoutes } from "../../navigations/AuthNavigator";
import { imageError } from "../../utils/httpReponse";
import { InputAuthScreenRef } from "../../common/components/InputAuthScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthScreenNavigationProps } from '../../navigations/AuthNavigator/Type';
import useCustomNavigation from "../../common/components/useCustomNavigation";


const AccountInfo = () => {
    const [avatar, setAvatar] = useState<string | undefined>(imageError)
    const fullNameRef = useRef<InputAuthScreenRef>(null)
    const emailRef = useRef<InputAuthScreenRef>(null)
    const phoneNumberRef = useRef<InputAuthScreenRef>(null)
    const [newImage, setNewImage] = useState<DocumentPickerResponse>();
    const navigation = useCustomNavigation();


    useEffect(() => {

        const fetchData = async () => {
            try {
                const resultUser: UserReponseViewModel | undefined = await apiUser.getUserProfile(await getUserIdFromToken())
                console.log(resultUser);
                setAvatar(_ => resultUser?.AvatarUrl)
                fullNameRef.current?.setValue(resultUser?.FullName || "")
                emailRef.current?.setValue(resultUser?.Email || "")
                phoneNumberRef.current?.setValue(resultUser?.PhoneNumber || "")
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
                        placeholder="Họ và tên"
                        ref={fullNameRef}
                        iconName="user"
                        onSubmit={() => phoneNumberRef.current?.onFocus()}
                    />
                    <InputAuthScreen
                        ref={phoneNumberRef}
                        placeholder="Số điện thoại"
                        iconName="phone"
                        onSubmit={() => { emailRef.current?.onFocus() }}
                    />

                    <InputAuthScreen
                        ref={emailRef}
                        placeholder="Email"
                        iconName="phone"
                    />
                </View>
                <FooterNavigation flex={1} leftTitle="Bỏ qua" rightTitle="Cập nhật"
                    rightEvent={async () => {
                        const model: UserPostViewModel = {
                            FullName: fullNameRef.current?.getValue() || "",
                            Email: emailRef.current?.getValue() || "",
                            PhoneNumber: phoneNumberRef.current?.getValue() || ""
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentAvatarImage: {
        width: 180,
        height: 180,
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
    }
})
export { AccountInfo }