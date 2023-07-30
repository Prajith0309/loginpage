import axios from 'axios'
import jwt_decode from 'jwt-decode'
axios.defaults.baseURL = "https://login-backend-lib.onrender.com"
//axios.defaults.baseURL = "http://localhost:8000/"



//get username from token
export const getUsername = async()=>{
    const token = localStorage.getItem('t')
    if(!token) return Promise.reject("cannot find token")
    let decode = jwt_decode(token)
    return decode
}




//authenticate function

export const authenticate = async(username) => {
    try{
        return await axios.post('/api/authenticate',{username})
    }catch(error){
        return { error:"username doesnt exists"}
    }
};


//get user details

export const getUser = async({username}) => {
    try{
        const data = await axios.get(`/api/user/${username}`)
        return data
    }catch(error){
        return { error:"password doesnt match"}
    }
};


//register user

export const registerUser = async(details) => {
    try{
        const {data:{msg},status}  = await axios.post('/api/register',details)
        
        let {username,email} = details;
        
        //send mail

        if(status === 201){
            await axios.post('/api/registerMail',{username,userEmail:email,text:msg})
        }
        return Promise.resolve(msg)
    }catch(error){
        return Promise.reject({error})
    }
};


//login user

export const verifyPassword = async(username,password) => {
    try{
        if(username){
            const data = await axios.post('/api/login',{username,password})
            return Promise.resolve(data)
        }
    }catch(error){
        return Promise.reject({ error:"password doesnt match"})
    }
};


//update user

export const updateUser = async(response) => {
    try{
        const token = await localStorage.getItem('t');
        const data = await axios.put('/api/updateuser/:id',response,{headers: {"Authorization": `Bearer ${token}`}})
        
        return Promise.resolve({data})
    }catch(error){
        return Promise.reject({msg:error})
    }
};


//generate otp

export const generateOTP = async(username) => {
    try{
        const {data:{code}, status} = await axios.get('/api/generateOTP',{params:{username}})
        if(status === 201){
            let {data: {email}} = await getUser({username});
            let text = `your otp is ${code}`
            await axios.post('/api/registerMail',{username,userEmail:email,text,subject:"password recovery otp"})
        }
        return Promise.resolve(code)
    }catch(error){
        return Promise.reject({error})
    }
};


//verify otp


export const verifyOTP = async({username,code}) =>{
    try{
       const {data,status} = await axios.get('/api/verifyOTP',{params:{username,code}})
       return {data,status}
    }catch(error){
        return Promise.reject({error})
    }
}


//reset password

export const resetPassword = async({username,password}) =>{
    try{
       const{data,status} = await axios.put('/api/resetPassword',{username,password})
       return Promise.resolve({data,status})
    }catch(error){
        return Promise.reject({error})
    }
}