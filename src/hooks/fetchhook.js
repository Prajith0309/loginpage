import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from "../helper/helper";
axios.defaults.baseURL = "https://login-backend-lib.onrender.com"
//axios.defaults.baseURL = "http://localhost:8000"

export const useFetch = (query)=>{
    const [getData,setData] = useState({isLoading: false, apiData: undefined, status: null, serverError: null})

    useEffect(()=>{
      const fetchData = async ()=>{
        try{
            setData(prev =>({...prev,isLoading:true}))
            const username = !query? await getUsername(): ' ';
            const name = username.username
            const{data,status} =!query? await axios.get(`/api/user/${name}`):await axios.get(`/api/${query}`);
            if(status === 201 || 200){
                setData(prev =>({...prev,isLoading:false}))
                setData(prev =>({...prev,apiData:data, status:status}));
            }
            setData(prev =>({...prev,isLoading:false}))  
        }catch(error){
            setData(prev =>({...prev,isLoading:false,serverError:error}))
        }
      }
      fetchData()
    },[query])

    return [getData,setData]
}