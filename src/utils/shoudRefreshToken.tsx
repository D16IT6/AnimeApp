import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    // ... các thuộc tính khác ...
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid': string;
    exp: number
}
export default async function shouldRefreshToken() {
    // Kiểm tra xem token có còn hợp lệ hay không
    const accessToken = await AsyncStorage.getItem("AccessToken");
    if (!accessToken) {
        await AsyncStorage.setItem("NeedLogin", "True");
        return false;
    }

    const decoded: JwtPayload = jwtDecode(accessToken.toString());
    const exp = decoded.exp;
    const now = getUTCNow();
    const utcJwt = new Date(exp * 1000);

    return utcJwt < now;
}
function getUTCNow() {
    return new Date();
}