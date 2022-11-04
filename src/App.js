import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import Home from "./screen/Home";
import Profil from "./screen/Profil";
import { AuthProvider } from "./components/Services/AuthContext";
import Paths from "./screen/Paths";
import Recuperation from "./screen/Recuperation";


function App() {
  
  const [isEdit, setIsEdit] = useState(false)
  const [map, setMap] = useState('')
  
  return (
    <>
    <AuthProvider>
        <Routes>
            <Route path="/" element={<DashBoard isEdit={isEdit} setIsEdit={setIsEdit} map={map}/>}> 
                <Route exact path="/profil" element={<Profil setIsEdit={setIsEdit} />} />
                <Route exact path="/" element={<Home isEdit={isEdit} setMap={setMap} setIsEdit={setIsEdit}/>} />
                <Route exact path="/paths" element={<Paths />} />
                <Route path="*" />         
            </Route>
            <Route path="/recuperation/:token" element={<Recuperation />} />
        </Routes>
    </AuthProvider>
    </>
  );
}

export default App;
