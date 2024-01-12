import axiosClient from "./axiosClient"
import { AnimeAgeRaitingModelView, AnimeCategoryModelView, AnimeStatusModelView, AnimeTypeModelView, CountryModelView } from "../ViewModel"


const apiFilter={
    getAllCountry : async ()=>{
        try
        {
            const res:CountryModelView[] = await axiosClient.get(`/Country`)
            return res
        }
         catch (error) {
            console.log(error)
        }
        
    },
    getAllAnimeAgeRating : async ()=>{
        try
        {
            const res:AnimeAgeRaitingModelView[] = await axiosClient.get(`/AnimeAgeRating`)
            return res
        }
         catch (error) {
            console.log(error)
        }
        
    } ,
     getAllAnimeCategory : async ()=>{
        try
        {
            const res:AnimeCategoryModelView[] = await axiosClient.get(`/AnimeCategory`)
            return res
        }
         catch (error) {
            console.log(error)
        }
        
    } ,
     getAllAnimeStatus : async ()=>{
        try
        {
            const res:AnimeStatusModelView[] = await axiosClient.get(`/AnimeStatus`)
            return res
        }
         catch (error) {
            console.log(error)
        }
        
    } ,
     getAllAnimeType : async ()=>{
        try
        {
            const res:AnimeTypeModelView[] = await axiosClient.get(`/AnimeType`)
            return res
        }
         catch (error) {
            console.log(error)
        }
        
    } 
}


export {apiFilter}