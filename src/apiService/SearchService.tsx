
import { imageError } from "../utils/httpReponse";
import { AnimeSearchRequestViewModel, AnimeSearchResponseViewModel } from "../ModelView";
import {  BASE_URL } from "@env";
import axiosClient from "./axiosClient";

const apiSearch={
   getSearch : async (model: AnimeSearchRequestViewModel)=>{
    try {
        const res:AnimeSearchResponseViewModel[] = await axiosClient.put(`/Anime/Search`,model)
        console.log(model)
        const updatedData:AnimeSearchResponseViewModel[] = res.map((item:AnimeSearchResponseViewModel) => {
            if (item && item.Poster !== null) {
              if (!item.Poster.startsWith('http')) {
                item.Poster = `${BASE_URL}${item.Poster}`;
              }
            } else {
              item.Poster = imageError;
            }
            return item; 
          });
        
        return updatedData
    }
     catch (error) {
        console.log(error);
    }
}
}

export {apiSearch}