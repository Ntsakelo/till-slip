import axios from 'axios';
import { useState } from 'react';

const url = 'https://till-slip-api.uc.r.appspot.com/api'
// const url = 'http://localhost:8000/api'

const usePost = () => {
   const [result,setResult] = useState(null)
   const [error,setError] = useState(null)

   const post = async(data,endpoint) => {
    try{
        const response = await axios({
             method:"POST",
             headers:{
              "Content-Type":'multipart/form-data',
             },
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