import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import Home from "./screen/Home";
import Profil from "./screen/Profil";
import Paths from "./screen/Paths";
import Recuperation from "./screen/Recuperation";
import Screen404 from "./screen/Screen404";
import Loading from "./components/Modal/Loading";
import { AuthContext } from './components/Services/AuthContext'
import Users from "./screen/Users";
import UsersPaths from "./screen/UsersPaths";

function App() {
  
  const {auth} = useContext(AuthContext)

  const [isEdit, setIsEdit] = useState(false)
  const [map, setMap] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000);
  }, [])
  

  return (
    <>
    <Loading show={isLoading}/>
    <Routes>
        <Route path="/" element={<DashBoard map={map}/>}>
            <Route exact path="/profil" element={auth.isAdmin ? <Users/>:<Profil setIsEdit={setIsEdit}/>} />
            <Route exact path="/" element={<Home isEdit={isEdit} setMap={setMap} setIsEdit={setIsEdit}/>} />
            <Route exact path="/paths" element={auth.isAdmin ? <UsersPaths/> : <Paths/>} />
            <Route path="*" element={<Screen404/>}/>         
        </Route>
        <Route path="/recuperation/:token" element={<Recuperation />} />
    </Routes>
    </>
  );
}

export default App;
