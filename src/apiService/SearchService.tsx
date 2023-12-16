import axios from "axios";
import { apiUrl, baseUrl, imageError } from "../utils/httpReponse";
import { AnimeSearchRequestViewModel, AnimeSearchResponseViewModel } from "../ModelView";

const getSearch = async (model: AnimeSearchRequestViewModel)=>{
    try {
        const res = await axios.put(`${apiUrl}/Anime/Search`,model)
        console.log(model)
        const updatedData = res.data.map((item:AnimeSearchResponseViewModel) => {
            if (item && item.Poster !== null) {
              if (!item.Poster.startsWith('http')) {
                item.Poster = `${baseUrl}${item.Poster}`;
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
export {getSearch}