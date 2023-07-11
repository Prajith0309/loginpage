import {create} from "zustand"

//to create a storage
export const useAuthStore = create((set)=>({
   auth:{
    Username: " ",
    active:false
   },
   setUsername: (name)=> set((state)=>({auth:{...state.auth,Username:name}}))
}))                  