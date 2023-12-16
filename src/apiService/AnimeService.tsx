//get{anime detail}
import { jwtDecode } from "jwt-decode";
import axios, { AxiosRequestConfig } from "axios";
import { apiUrl, baseUrl, imageError } from "../utils/httpReponse";
import { AnimeHitViewModel, AnimeNewEpisodeReleasesViewModel, LoginResponseViewModel } from "../ModelView";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import "core-js/stable/atob";
import { decode } from "base-64";
global.atob = decode;

function getUTCNow() {
  var now = new Date();
  var utc = new Date(now.getTime());
  return utc;
}
const getAnimeHot = async () => {
  try {
    const token = (await AsyncStorage.getItem("AccessToken")).toString();

    const decoded = jwtDecode(token);

    const exp = decoded.exp;
    var now = getUTCNow();
    var utcJwt = new Date(exp * 1000);

    console.log("hết hạn token: " + utcJwt);
    console.log("thời gian hiện tại: " + now);

    if (utcJwt < now) {
      const userId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"];
      const refreshToken = (await AsyncStorage.getItem("RefreshToken")).toString()
      console.log(refreshToken)
      try {
        const res = await axios.post(`${apiUrl}/Auth/Refresh-Token`, {
          userId,
          refreshToken
        })
        if (res.status === 200) {
          const data: LoginResponseViewModel = res.data;
          console.log(data);
          AsyncStorage.setItem("AccessToken", data.AccessToken)
          AsyncStorage.setItem("RefreshToken", data.RefreshToken)
          console.log("đã refresh token thành công")
        }
        else {
          console.log("chuyen trang ve dang nhap")
        }
      }
      catch (e) {
        console.log("chưa thể gọi")
      }
    }
    else {
      console.log('token còn sử dụng được')
    }
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${(await AsyncStorage.getItem("AccessToken")).toString()}`
      }
    }
  
    try {
      const res1 = await axios.get(`http://api.talonezio.click/api/User/1`, config)
      const userRes = res1.data;
      console.log('goi user');
      console.log(userRes);
    }
    catch (e)
    {
      console.log('loi goi user');
      console.log(e);
    }

    
    const res = await axios.get(`${apiUrl}/Anime/Hit`, config)
    const updatedData = res.data.map((item: AnimeHitViewModel) => {
      if (item && item.Poster !== null) {
        if (!item.Poster.startsWith('http')) {
          item.Poster = `${baseUrl}${item.Poster}`;
        }
      } else {
        item.Poster = imageError;
      }
      item.Rating = item.Rating === "NaN" ? "0" : item.Rating
      return item;
    });
    return updatedData
  }
  catch (error) {
    console.log(error);
  }
}

const getAnimNewEpisodeRelease = async (pageNumber: number, pageSize: number) => {
  try {
    const res = await axios.get(`${apiUrl}/Anime/NewEpisodeRelease`,
      {
        params: {
          pageNumber: pageNumber,
          pageSize: pageSize
        }
      })

    const updatedData = res.data.data.map((item: AnimeNewEpisodeReleasesViewModel) => {
      if (item && item.Poster !== null) {
        if (!item.Poster.startsWith('http')) {
          item.Poster = `${baseUrl}${item.Poster}`;
        }
      } else {
        // Nếu Poster là null hoặc data là undefined, đặt một hình ảnh mặc định hoặc xử lý nó theo yêu cầu của bạn
        item.Poster = imageError;
      }
      item.Rating = item.Rating === "NaN" ? "0" : item.Rating
      return item; // Trả về item sau khi xử lý
    });
    return updatedData
  } catch (error) {
    console.log(error)
  }
}
const getAnimeById = async (animeId: number) => {
  try {
    const res = await axios.get(`${apiUrl}/Anime/${animeId}`)

    return res.data

  } catch (error) {
    console.log(error)
  }
}
export { getAnimeHot, getAnimNewEpisodeRelease, getAnimeById }