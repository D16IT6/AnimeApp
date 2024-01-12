import { View, Text, SafeAreaView, StyleSheet, Image, StatusBar, Keyboard, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { logo } from '../../common/Images'
import { Color } from '../../common/Colors';
import { useNavigation } from '@react-navigation/native'
import { AuthScreenNavigationProps, AuthRoutes } from '../../navigations/AuthNavigator';
import { ButtonAuthScreen, InputAuthScreen, KeyboardAvoidingContainer, LineAuthScreen, LinkAuthScreen, Loader, NavagitonTop } from '../../common/components';
import fontFamily from '../../common/FontFamily';
import { Errors, ForgotPasswordRequestViewModel } from '../../ViewModel';
import { InputAuthScreenRef } from '../../common/components/InputAuthScreen';
import Screen from '../../utils/screenInformation';
import validateEmail from '../../utils/validateEmail';
import { apiAuth } from '../../apiService/AuthService';
import useCustomNavigation from '../../common/components/useCustomNavigation';
const ForgotPasswordScreen = () => {
    const navigation = useNavigation<AuthScreenNavigationProps>();
    const emailRef = useRef<InputAuthScreenRef>(null)

    const [errors, setErrors] = useState<Errors>({})
    const [loading, setLoading] = useState(false)

    const validate = async () => {
        console.log()
        Keyboard.dismiss();
        let isValid = true;
        if (!emailRef.current?.getValue()) {
            handleError("Chưa nhập email !", "email")
            isValid = false;
        }
        else if (!validateEmail(emailRef.current.getValue())) {
            handleError("Nhập email chưa đúng định dạng !", "email")
            isValid = false;
        }
        if (isValid) {
            await sendRequest()
        }
    }
    const sendRequest = async () => {
        setLoading(true)
        const model: ForgotPasswordRequestViewModel = {
            Email: emailRef.current?.getValue().toString() || "",
        }
        const result = await apiAuth.forgotPassword(model.Email);
        if (result !== undefined) {
            Alert.alert("Thông báo", result?.Message);
        }
        setLoading(false)
    }
    const handleError = (errorMessage: string | null, input: string) => {
        setErrors(prevState => ({ ...prevState, [input]: errorMessage }))
    }
    return (
        <KeyboardAvoidingContainer style={styles.container}>
            <Loader visible={loading} />
            <NavagitonTop
                OnPressArrowBack={
                    () => { navigation.navigate(AuthRoutes.Login) }
                }
            />
            <View style={styles.header}>
                <Image source={logo} style={styles.logo}></Image>

                <Text style={styles.title}> Nhập thông tin Email </Text>
            </View>
            <View
                style={styles.contentSignUp}>
                <InputAuthScreen
                    ref={emailRef}
                    placeholder="Email"
                    iconName="envelope-o"
                    error={errors.email}
                    password={false}
                    onFocus={() => {
                        handleError(null, "email")
                    }}
                />
                <ButtonAuthScreen
                    title='Gửi thông tin'
                    onPressBtn={async () => {
                        await validate()

                    }
                    }
                    styleBtn={styles.btnSubmit}
                />
            </View>
        </KeyboardAvoidingContainer>
    )

}
const styles = StyleSheet.create({
    container: {
        height: Screen.height - (StatusBar.currentHeight ? StatusBar.currentHeight : 0)
    },
    header: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: Color.SecondaryColor,
    },
    logo: {
        height: 150,
        width: 150
    },
    title: {
        fontSize: 23,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Color.Black,
        width: "100%",
        height: "20%",
        fontFamily: fontFamily.PrimaryFont,
    },
    contentSignUp: {
        flex: 3,
        backgroundColor: Color.SecondaryColor,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    btnSubmit: {
        marginTop: Screen.height * 0.1
    }
})

export default ForgotPasswordScreen