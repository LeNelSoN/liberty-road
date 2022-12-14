import React, { useState } from "react"
import { SiOpenstreetmap } from 'react-icons/si';
import { TfiLayoutListThumbAlt } from 'react-icons/tfi';
import { ImProfile } from 'react-icons/im';
import { Link, Outlet} from "react-router-dom";
import Location from "./Map/Location";

function DashBoard({map}) {

  const [locateIsDisable, setlocateIsDisable] = useState(false)

  const handleClick = () => {
    setlocateIsDisable(true)
  }

  return (
      <div className="main">
        <Outlet />
        <div className="container-fluid fixed-bottom bg-white">
          <div className="container">
            <div className="row my-3">
              <div className="col-3 text-center" onClick={handleClick}><Link to='/profil'><ImProfile className="h1"/></Link></div>
              <div className="col-3 text-center" onClick={() => setlocateIsDisable(false)}><Link to='/' ><SiOpenstreetmap className="h1"/></Link></div>
              <div className="col-3 text-center" onClick={handleClick}><Link to='/paths'><TfiLayoutListThumbAlt className="h1"/></Link></div>
              <div className="col-3 text-center"><Location map={map} locateIsDisable={locateIsDisable}/></div>
            </div>
          </div>
        </div>
      </div>

  )
}

export default DashBoard