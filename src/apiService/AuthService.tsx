import axios from "axios";
import { ForgotPasswordResponseViewModel, LoginRequestViewModel, LoginResponseViewModel, SignupRequestViewModel } from "../ViewModel";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

//push{user}
const apiAuth = {
    login: async (model: LoginRequestViewModel) => {
        try {
            const res = await axios.post(`${API_URL}/Auth/Login`, model)

            if (res.status === 200) {
                const data: LoginResponseViewModel = res.data;
                await AsyncStorage.setItem("NeedLogin", "false");
                return data;
            }
            await AsyncStorage.setItem("NeedLogin", "true");
            return null;

        }
        catch (error) {
            await AsyncStorage.setItem("NeedLogin", "true");

            console.log(error);
            return null;
        }
    },
    sigup: async (model: SignupRequestViewModel) => {
        try {
            const res = await axios.put(`${API_URL}/Auth`, model)

            if (res.status === 200) {
                return true;
            }
            return null;

        }
        catch (error) {
            console.log(error);
            return null;
        }
    },
    forgotPassword: async (email: string): Promise<ForgotPasswordResponseViewModel | null> => {
        try {
            const url = `http://talonezio.click/Account/ResetPasswordApi`;
            const res = await axios.post(url, {
                email: email
            })

            const data: ForgotPasswordResponseViewModel = res.data;
            return data;

        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
}

export { apiAuth }