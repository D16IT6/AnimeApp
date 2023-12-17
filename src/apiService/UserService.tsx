
import { imageError } from "../utils/httpReponse";
import {  BASE_URL } from "@env";
import axiosClient from "./axiosClient";
import { UserReponseViewModel } from "../ModelView";

const apiUser={
   getUserProfile : async (userId:number)=>{
    try {
        console.log("userid",`/Anime/User/${userId}`)
        const res:UserReponseViewModel= await axiosClient.get(`/User/${userId}`)
        const updatedData:UserReponseViewModel =  {
            ...res,
            AvatarUrl: res && res.AvatarUrl !== null ? (!res.AvatarUrl.startsWith('http') ? `${BASE_URL}${res.AvatarUrl}` : res.AvatarUrl) : imageError,
        }
          return updatedData
    }
     catch (error) {
        console.log(error);
    }
}
}

export {apiUser}