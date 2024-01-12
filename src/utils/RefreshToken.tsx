import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginResponseViewModel } from "../ViewModel";
import axios from "axios";
import { API_URL } from "@env";
import getUserIdFromToken from "./getUserId";


export default async function refreshAccessToken(): Promise<string | null> {
    const userId: number = await getUserIdFromToken();
    const refreshToken = (await AsyncStorage.getItem("RefreshToken"))?.toString();

    console.log(userId + ' ' + refreshToken);
    try {
        const res = await axios.post(`${API_URL}/Auth/Refresh-Token`, {
            userId,
            refreshToken
        });

        if (res.status === 200) {
            const data: LoginResponseViewModel = res.data;
            AsyncStorage.setItem("AccessToken", data.AccessToken);
            AsyncStorage.setItem("RefreshToken", data.RefreshToken);
            await AsyncStorage.setItem("NeedLogin", "false");
            return data.AccessToken;
        }
        await AsyncStorage.setItem("NeedLogin", "true");

        return null;

    } catch (e) {
        await AsyncStorage.setItem("NeedLogin", "true");
        return null;
    }

}