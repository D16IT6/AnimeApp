
import { imageError } from "../utils/httpReponse";
import { BASE_URL } from "@env";
import axiosClient from "./axiosClient";
import { UserPostViewModel, UserReponseViewModel } from "../ModelView";
import { DocumentPickerResponse } from "react-native-document-picker";

const apiUser = {
    getUserProfile: async (userId: number) => {
        try {
            const res: UserReponseViewModel = await axiosClient.get(`/User/${userId}`)
            const data: UserReponseViewModel = {
                ...res,
                AvatarUrl: res && res.AvatarUrl !== null ? (!res.AvatarUrl.startsWith('http') ? `${BASE_URL}${res.AvatarUrl}` : res.AvatarUrl) : imageError,
            }
            return data
        }
        catch (error) {
            console.log(error);
        }
    },
    updateProfile: async (model: UserPostViewModel) => {
        try {
            const res = await axiosClient.post(`/User`, {
                Fullname: model.FullName,
                Email: model.Email,
                PhoneNumber: model.PhoneNumber
            });
            console.log(res);
            return res.status === 200;
        }
        catch (error) {
            console.log(error);
            return 'Có lỗi xảy ra';
        }
    }
}

export { apiUser }