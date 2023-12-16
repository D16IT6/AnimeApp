import axios from "axios";
import { LoginRequestViewModel, LoginResponseViewModel } from "../ModelView";
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
    }
}

export{apiAuth}