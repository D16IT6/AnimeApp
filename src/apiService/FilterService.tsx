import axios from "axios"
import { apiUrl, baseUrl } from "../utils/httpReponse"

const getAllCountry = async ()=>{
    try
    {
        const res = await axios.get(`${apiUrl}/Country`)
        return res.data
    }
     catch (error) {
        console.log(error)
    }
    
} 
const getAllAnimeAgeRating = async ()=>{
    try
    {
        const res = await axios.get(`${apiUrl}/AnimeAgeRating`)
        return res.data
    }
     catch (error) {
        console.log(error)
    }
    
} 
const getAllAnimeCategory = async ()=>{
    try
    {
        const res = await axios.get(`${apiUrl}/AnimeCategory`)
        return res.data
    }
     catch (error) {
        console.log(error)
    }
    
} 
const getAllAnimeStatus = async ()=>{
    try
    {
        const res = await axios.get(`${apiUrl}/AnimeStatus`)
        return res.data
    }
     catch (error) {
        console.log(error)
    }
    
} 
const getAllAnimeType = async ()=>{
    try
    {
        const res = await axios.get(`${apiUrl}/AnimeType`)
        return res.data
    }
     catch (error) {
        console.log(error)
    }
    
} 
export {getAllCountry,
    getAllAnimeAgeRating,
    getAllAnimeType,
    getAllAnimeStatus,
    getAllAnimeCategory
}