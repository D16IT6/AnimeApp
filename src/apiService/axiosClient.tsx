import axios from 'axios';
import queryString from 'query-string';
import { API_URL } from '@env';
import { decode } from "base-64";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import refreshAccessToken from '../utils/RefreshToken';
import shouldRefreshToken from '../utils/shoudRefreshToken';

global.atob = decode;




// Giả sử AsyncStorage có các loại cần thiết
const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  let accessToken = await AsyncStorage.getItem("AccessToken");

  if (await shouldRefreshToken()) {
    accessToken = await refreshAccessToken();
  }
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  // console.log(config);
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


export default axiosClient;