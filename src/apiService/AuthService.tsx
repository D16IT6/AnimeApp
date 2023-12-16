 //get{user}

import axios from "axios";
import { apiUrl } from "../utils/httpReponse";
import { LoginRequestViewModel, LoginResponseViewModel } from "../ModelView";

//push{user}
  
const login = async (model: LoginRequestViewModel) => {
    try {
        const res = await axios.post(`${apiUrl}/Auth/Login`, model)
        
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
export{login}