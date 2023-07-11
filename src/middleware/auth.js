import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/store";

export const AuthorizeUser = ({children}) =>{
    const token = localStorage.getItem('t');
    if(!token){
      return <Navigate to={'/'} replace={true}></Navigate>
    }
     return children;
}

export const ProtectRoute = ({children}) =>{
    const username = useAuthStore.getState().auth.Username
    if(!username){
      return <Navigate to={'/'} replace={true}></Navigate>
    }
     return children;
}