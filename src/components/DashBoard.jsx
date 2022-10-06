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
          <div className="row">
            <div className="col-4 text-center"><Link to='/profil' className="btn"><CgProfile className="h1"/></Link></div>
            <div className="col-4 text-center"><Link to='/' className="btn"><MdWhereToVote className="h1"/></Link></div>
            <div className="col-4 text-center"><Link to='/paths' className="btn"><FaListUl className="h1"/></Link></div>
          </div>
        </div>
      </div>

  )
}

export default DashBoard