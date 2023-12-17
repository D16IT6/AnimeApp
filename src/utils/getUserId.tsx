import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid': string;
  exp:number
}

async function getUserIdFromToken() :Promise<number>{
  const accessToken = await AsyncStorage.getItem("AccessToken");

  // Check if accessToken is present before using it
  if (!accessToken) {
    return 0; // or handle the absence of a valid token
  }

  const decoded: JwtPayload = jwtDecode(accessToken.toString());
  return parseInt(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"]);
}

export default getUserIdFromToken