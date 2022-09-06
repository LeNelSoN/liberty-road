import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import Home from "./screen/Home";
import Profil from "./screen/Profil";

function App() {
  const useEdit = useState(false)
  const [isEdit] = useEdit
  return (
    <>
      <Routes>
        <Route exact path="/profil" element={<Profil useEdit={useEdit}/>} />
        <Route exact path="/home" element={<Home isEdit={isEdit}/>} />
        <Route exact path="/paths" element={<Home />} />
        <Route exact path="/" element={<Home />} />
        <Route path="*" /> 
      </Routes>
      <DashBoard />
    </>
  );
}

export default App;
