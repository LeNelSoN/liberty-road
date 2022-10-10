import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import Home from "./screen/Home";
import Profil from "./screen/Profil";
import { AuthProvider } from "./controllers/AuthContext";
import Paths from "./screen/Paths";


function App() {
  
  const [isEdit, setIsEdit] = useState(false)
  
  return (
    <>
    <AuthProvider>
        <Routes>
            <Route path="/" element={<DashBoard />}> 
                <Route exact path="/profil" element={<Profil setIsEdit={setIsEdit} />} />
                <Route exact path="/" element={<Home isEdit={isEdit} />} />
                <Route exact path="/paths" element={<Paths />} />
                <Route path="*" />         
            </Route>
        </Routes>
    </AuthProvider>
    </>
  );
}

export default App;
