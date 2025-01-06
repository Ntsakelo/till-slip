import axios from 'axios';
import { useState } from 'react';

const url = 'https://till-slip-api.uc.r.appspot.com/api'

const usePost = () => {
   const [result,setResult] = useState(null)
   const [error,setError] = useState(null)

   const post = async(data,endpoint) => {
    try{
        const response = await axios({
             method:"POST",
            
             url:`${url}/${endpoint}`,
             data:data
         });
       setResult(response)
    }catch(err){
      setError(err)
    }

   }
   return {post,result,error}
}

export default usePost;