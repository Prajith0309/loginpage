import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import components--start
import Username from "./components/username";
import Register from "./components/register";
import Password from "./components/password";
import Recovery from "./components/recovery";
import Profile from "./components/profile";
import Reset from "./components/reset";
import Pagenotfound from "./components/pagenotfound";
import { AuthorizeUser, ProtectRoute } from "./middleware/auth";
// import components--end


function App() {
  return <>
  <BrowserRouter>
   <Routes>
     <Route path='/'element={<Username />} />
     <Route path='/register'element={<Register />} />
     <Route path='/password'element={<ProtectRoute><Password /></ProtectRoute>} />
     <Route path='/recovery'element={<Recovery />} />
     <Route path='/profile'element={<AuthorizeUser><Profile /></AuthorizeUser>} />
     <Route path='/reset'element={<Reset />} />
     <Route path='*'element={<Pagenotfound />} />
   </Routes>
  </BrowserRouter>
  </>
}

export default App;
