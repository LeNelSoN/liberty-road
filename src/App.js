import React, { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import Home from "./screen/Home";
import Profil from "./screen/Profil";


function App() {
  
  const [isEdit, setIsEdit] = useState(false)
  const [auth, setAuth] = useState(false)
  

  return (
    <>
        <Routes>
            <Route path="/" element={<DashBoard />}> 
              <Route exact path="/profil" element={<Profil setIsEdit={setIsEdit} setAuth={setAuth} auth={auth}/>} />
              <Route exact path="/" element={<Home isEdit={isEdit} />} />
              <Route exact path="/paths" element={<Home />} />
              <Route path="*" />         
            </Route>
        </Routes>
    </>
  );
}

export default App;
