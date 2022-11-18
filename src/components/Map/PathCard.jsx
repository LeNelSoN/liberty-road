import React from 'react'
import BtnDelete from '../Button/BtnDelete'
import MapCard from './MapCard'

const PathCard = ({id, name, description, createdAt, withNavigate}) => {

  return (
<div className="card m-3 bg-success bg-opacity-75 p-3" >
  <div className="row g-0">
    <div className="col-md-4">
      <MapCard id={id} withNavigate={withNavigate}/>
    </div>
    <div className="col-md-7">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text"><small className="text-light">Créé le {`${new Date(createdAt)}`}</small></p>
      </div>
    </div>
    <div className='col-md-1 text-center'>
      <BtnDelete id={id}/> 
    </div>
  </div>
</div>  
)}

export default PathCard