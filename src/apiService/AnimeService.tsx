import axios from "axios";
import { imageError } from "../utils/httpReponse";
import { API_URL, BASE_URL } from '@env';
import { AnimeDetailsViewModel, AnimeHitViewModel, AnimeNewEpisodeReleasesViewModel, LoginResponseViewModel } from "../ModelView";

import axiosClient from "./axiosClient";

const animeApi = {
  getAnimeHot: async () => {
    try {
      const res: AnimeHitViewModel[] = await axiosClient.get(`${API_URL}/Anime/Hit`)
      const updatedData : AnimeHitViewModel[] = res.map((item: AnimeHitViewModel) => {
        if (item && item.Poster !== null) {
          if (!item.Poster.startsWith('http')) {
            item.Poster = `${BASE_URL}${item.Poster}`;
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
  },

  getAnimNewEpisodeRelease: async (pageNumber: number, pageSize: number) => {
    try {
      const url = '/Anime/NewEpisodeRelease';
      const res = await axiosClient.get(url,
        {
          params: {
            pageNumber: pageNumber,
            pageSize: pageSize
          }
        })
      const updatedData = res.data.map((item: AnimeNewEpisodeReleasesViewModel) => {
        if (item && item.Poster !== null) {
          if (!item.Poster.startsWith('http')) {
            item.Poster = `${BASE_URL}${item.Poster}`;
          }
        } else {
          item.Poster = imageError;
        }
        item.Rating = item.Rating === "NaN" ? "0" : item.Rating
        return item; // Trả về item sau khi xử lý
      });
      return updatedData
    } catch (error) {
      console.log(error)
    }
  },
  getAnimeById : async (animeId: number) => {
    try {
      const res:AnimeDetailsViewModel = await axiosClient.get(`${API_URL}/Anime/${animeId}`)
      const updatedData:AnimeDetailsViewModel= {
        ...res,
        Poster: res && res.Poster !== null ? (!res.Poster.startsWith('http') ? `${BASE_URL}${res.Poster}` : res.Poster) : imageError,
        Rating: res.Rating === "NaN" ? "0" : res.Rating,
      };
      console.log(updatedData)
      return updatedData
    } catch (error) {
      console.log(error)
    }
}


}
export { animeApi }