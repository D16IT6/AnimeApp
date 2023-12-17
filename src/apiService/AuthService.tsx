import axios from "axios";
import { LoginRequestViewModel, LoginResponseViewModel, SignupRequestViewModel } from "../ModelView";
import { API_URL } from "@env";

//push{user}
const apiAuth = {
    login : async (model: LoginRequestViewModel) => {
        try {
            const res = await axios.post(`${API_URL}/Auth/Login`, model)
            
            if (res.status === 200)
            {
                const data: LoginResponseViewModel = res.data;
                return data;
            }
            return null;
        
        }
        catch (error) {
            console.log(error);
            return null;
        }
    },
    sigup: async (model: SignupRequestViewModel) => {
        try {
            const res = await axios.put(`${API_URL}/Auth`, model)
            
            if (res.status === 200)
            {
                return true;
            }
            return null;
        
        }
        catch (error) {
            console.log(error);
            return null;
        }
    },
}

export{apiAuth}