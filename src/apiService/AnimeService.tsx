import { imageError } from "../utils/httpReponse";
import { API_URL, BASE_URL } from '@env';
import { AnimeDetailsReponseViewModel, AnimeDetailsViewModel, AnimeHitViewModel, AnimeNewEpisodeReleasesViewModel, AnimeRandomViewModel } from "../ModelView";

import axiosClient from "./axiosClient";

const animeApi = {
  getAnimeHot: async () => {
    try {
      const res: AnimeHitViewModel[] = await axiosClient.get(`/Anime/Hit`)
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
  getAnimeRandom : async () => {
    try {
      const url = '/Anime/Random';
      const res:AnimeRandomViewModel[] = await axiosClient.get(url)
      const updatedData:AnimeRandomViewModel[] = res.map((item: AnimeRandomViewModel) => {
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
      const res:AnimeDetailsReponseViewModel = await axiosClient.get(`/Anime/${animeId}`)
      const updatedData:AnimeDetailsViewModel= {
        ...res,
        Poster: res && res.Poster !== null ? (!res.Poster.startsWith('http') ? `${BASE_URL}${res.Poster}` : res.Poster) : imageError,
        Rating: parseFloat(res.Rating === "NaN" ? "0" : res.Rating),
      };
      return updatedData
    } catch (error) {
      console.log(error)
    }
}


}
export { animeApi }