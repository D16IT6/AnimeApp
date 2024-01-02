import { imageError } from "../utils/httpReponse";
import { MyListResponseViewModel, MyListUpdateViewModel } from "../ModelView";
import {  BASE_URL } from "@env";
import axiosClient from "./axiosClient";

const apiMyList = {
    getMyList: async () => {
        try {
            const res: MyListResponseViewModel[] = await axiosClient.get(`/AnimeFavorite`)
            const updatedData: MyListUpdateViewModel[] = res.map((item: MyListResponseViewModel) => {
                if (item && item.Poster !== null) {
                    if (!item.Poster.startsWith('http')) {
                        item.Poster = `${BASE_URL}${item.Poster}`;
                    }
                } else {
                    item.Poster = imageError;
                }
                item.Rating = item.Rating === "NaN" ? "0" : item.Rating
                return {...item,Opened:false};
            });
            
            return updatedData
        }
        catch (error) {
            console.log(error);
        }
    },
    deleteMyList: async (myListId:number) => {
        try {
            const res  = await axiosClient.delete(`/AnimeFavorite/${myListId}`)
            if(res.status===200)
            {
                return true
            }
            return false
        }
        catch (error) {
            console.log(error);
        }
    },
    createMyList: async (animeId:number) => {
        try {
            
            const res  = await axiosClient.put(`/AnimeFavorite?animeId=${animeId}`)
            console.log(res)
            if(res!==undefined)
            {
                return true
            }
            return false
        }
        catch (error) {
            console.log(error);
        }
    }
}

export { apiMyList}