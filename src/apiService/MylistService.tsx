import { imageError } from "../utils/httpReponse";
import { MyListResponseViewModel } from "../ModelView";
import {  BASE_URL } from "@env";
import axiosClient from "./axiosClient";

const apiMyList = {
    getMyList: async (userId:number) => {
        try {
            const res: MyListResponseViewModel[] = await axiosClient.get(`/AnimeFavorite/${userId}`)
            const updatedData: MyListResponseViewModel[] = res.map((item: MyListResponseViewModel) => {
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
    }
}

export { apiMyList}