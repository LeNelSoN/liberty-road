import React from "react"
import { MdWhereToVote } from 'react-icons/md';
import { FaListUl } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { Link, Outlet } from "react-router-dom";

function DashBoard() {

  return (
      <div className="main">
        <Outlet />

        <div className="container fixed-bottom">
          <div className="row my-3">
            <div className="col-4 text-center "><Link to='/profil' ><CgProfile className="h1"/></Link></div>
            <div className="col-4 text-center"><Link to='/' ><MdWhereToVote className="h1"/></Link></div>
            <div className="col-4 text-center"><Link to='/paths' ><FaListUl className="h1"/></Link></div>
          </div>
        </div>
      </div>

  )
}

export default DashBoard