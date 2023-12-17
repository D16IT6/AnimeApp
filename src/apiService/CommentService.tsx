 //get{Comment}

  //push{Comment}

  import { imageError } from "../utils/httpReponse";
  import { API_URL, BASE_URL } from '@env';

  import axiosClient from "./axiosClient";
import { CommentRequestViewModel, CommentResponseView } from "../ModelView";
  
  const CommentApi = {
    getAllComment: async (animeId:string) => {
      try {
        const url="/Comment"
        const res:CommentResponseView[] = await axiosClient.get(url+`?animeId=${animeId}`) 
        const updatedData = res.map((item: CommentResponseView) => {
          if (item && item.AvatarUrl !== null) {
            if (!item.AvatarUrl.startsWith('http')) {
              item.AvatarUrl = `${BASE_URL}${item.AvatarUrl}`;
            }
          } else {
            item.AvatarUrl = imageError;
          }
          return item; // Trả về item sau khi xử lý
        });
        return updatedData
        // return res
      }
      catch (error) {
        console.log(error);
      }
    },
  
    putComment: async (model:CommentRequestViewModel) => {
      try {
        const url = '/Comment';
        const res = await axiosClient.put(url,model)
        if(res.status===200)
        {
            return res
        }
        return null
      } catch (error) {
        console.log(error)
      }
    },
  }
  export { CommentApi }