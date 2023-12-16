import axios from 'axios';
import queryString from 'query-string';
import { API_URL } from '@env';
import { decode } from "base-64";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { LoginResponseViewModel } from '../ModelView';

global.atob = decode;

// function getUTCNow() {
//   var now = new Date();
//   var utc = new Date(now.getTime());
//   return utc;
// }

interface JwtPayload {
  // ... các thuộc tính khác ...
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid': string;
  exp:any
}

// Giả sử AsyncStorage có các loại cần thiết
const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const accessToken = await AsyncStorage.getItem("AccessToken");
  const token = accessToken !== null ? accessToken.toString() : "";

  // Thêm token vào header nếu có
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Kiểm tra hết hạn token và làm mới nếu cần
  if (await shouldRefreshToken()) {
    await refreshAccessToken();
  }
  return config;
});

axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data;
  }
  return response;
}, (error) => {
  // Handle errors
  throw error;
});

async function shouldRefreshToken() {
  // Kiểm tra xem token có còn hợp lệ hay không
  const accessToken = await AsyncStorage.getItem("AccessToken");
  if (!accessToken) {
    return false;
  }

  const decoded: JwtPayload = jwtDecode(accessToken.toString());
  const exp = decoded.exp;
  const now = getUTCNow();
  const utcJwt = new Date(exp * 1000);

  return utcJwt < now;
}

async function refreshAccessToken() {
  const userId = getUserIdFromToken();
  const refreshToken1 = await AsyncStorage.getItem("RefreshToken");
  const refreshToken = refreshToken1 !== null ? refreshToken1.toString() : "";

  try {
    const res = await axios.post(`${API_URL}}/Auth/Refresh-Token`, {
      userId,
      refreshToken
    });
    console.log( "day roi"+userId+refreshToken)
    if (res.status === 200) {
      const data: LoginResponseViewModel = res.data;
      console.log(data);
      AsyncStorage.setItem("AccessToken", data.AccessToken);
      AsyncStorage.setItem("RefreshToken", data.RefreshToken);
      console.log("Đã làm mới token thành công");
    } else {
      console.log("Chuyển trang về đăng nhập");
    }
  } catch (e) {
    console.log("Chưa thể gọi refresh token");
  }
}
async function getUserIdFromToken() {
  const accessToken = await AsyncStorage.getItem("AccessToken");

  // Check if accessToken is present before using it
  if (!accessToken) {
    return null; // or handle the absence of a valid token
  }

  const decoded: JwtPayload = jwtDecode(accessToken.toString());
  return decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"];
}
function getUTCNow() {
  return new Date();
}
export default axiosClient;