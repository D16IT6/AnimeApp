 //get{anime detail}

import axios from "axios";
import { apiUrl, baseUrl, imageError } from "../utils/httpReponse";
import { AnimeHitViewModel, AnimeNewEpisodeReleasesViewModel } from "../ModelView";


const getAnimeHot = async ()=>{
    try {
        const res = await axios.get(`${apiUrl}/Anime/Hit`)
        const updatedData = res.data.map((item:AnimeHitViewModel) => {
            if (item && item.Poster !== null) {
              if (!item.Poster.startsWith('http')) {
                item.Poster = `${baseUrl}${item.Poster}`;
              }
            } else {
              item.Poster = imageError;
            }
            item.Rating=item.Rating==="NaN"?"0":item.Rating
            return item; 
          });
        return updatedData
    }
     catch (error) {
        console.log(error);
    }
}

const getAnimNewEpisodeRelease = async (pageNumber:number,pageSize:number)=>{
       try {
        const res = await axios.get(`${apiUrl}/Anime/NewEpisodeRelease`,
        {params:{
            pageNumber:pageNumber,
            pageSize:pageSize
        }})
        
        const updatedData = res.data.data.map((item:AnimeNewEpisodeReleasesViewModel) => {
            if (item && item.Poster !== null) {
              if (!item.Poster.startsWith('http')) {
                item.Poster = `${baseUrl}${item.Poster}`;
              }
            } else {
              // Nếu Poster là null hoặc data là undefined, đặt một hình ảnh mặc định hoặc xử lý nó theo yêu cầu của bạn
              item.Poster = imageError;
            }
            item.Rating=item.Rating==="NaN"?"0":item.Rating
            return item; // Trả về item sau khi xử lý
          });
        return updatedData
       } catch (error) {
        console.log(error)
       }
    }
const getAnimeById = async (animeId:number)=>{
    try {
     const res = await axios.get(`${apiUrl}/Anime/${animeId}`)
     
     return res.data

    } catch (error) {
     console.log(error)
    }
 }
 export {getAnimeHot,getAnimNewEpisodeRelease,getAnimeById}