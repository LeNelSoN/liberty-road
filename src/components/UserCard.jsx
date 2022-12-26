import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../components/Services/AuthContext'
import NewPath from './Modal/NewPath'
import { SlOptionsVertical } from 'react-icons/sl';
import ModalUpdate from './Modal/ModalUpdate';
import BtnDisconnect from './Button/BtnDisconnect';
import { doFetch } from './Services/doFetch';

function UserCard({setIsEdit}) {
  
    const [Data, setData] = useState({})
    const [showPathCreate, setShowPathCreate] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const {auth, setAuth} = useContext(AuthContext)

    useEffect(() => {
      doFetch(`/hikkers/${auth.hikkerId}?with=paths`, 'GET')
          .then((data) => {
            console.log(data)
            if(data){
                setData(data.data)
            }
          })
      }, [auth])

      const handleEdit = () => {
        setShowPathCreate(true)
      }

  return (
    <>
      <NewPath 
        setShowPathCreate={setShowPathCreate} 
        showPathCreate={showPathCreate}
        setIsEdit={setIsEdit}
        setAuth={setAuth}
        auth={auth}
      />
      <ModalUpdate
        show={isUpdate}
        setShow={setIsUpdate}
        username={Data.hikker?.username}
        address={Data.hikker?.address}
        id={auth.hikkerId}
        setAuth={setAuth}
      />
      <div className="mb-5 col-12 col-lg-4 bg-white bg-opacity-75 text-center rounded">
      <div className='d-flex justify-content-end'>
        <button className='btn btn-outline-success rounded-pill mt-3 me-3' onClick={()=>{setIsUpdate(!isUpdate)}}><SlOptionsVertical/></button>
      </div>
        <div className='pb-5 '>
          <h2 className='mb-4'>{!auth.isAdmin && Data.hikker?.username}</h2>
          <div>
              <p>Votre havre de paix : {!auth.isAdmin && Data.hikker?.address}</p>
          </div>
          <div>
              <p>{Data.paths?.length} chemin{Data.paths?.length < 2 ? "": "s" } vers la liberté enregistré{Data.paths?.length < 2 ? "": "s" }</p> 
          </div>
          <div className='d-flex flex-column mx-5 mt-5'>
              <button className='btn btn-success' onClick={handleEdit}>Voulez-vous créer un nouveau chemin ?</button>
              <BtnDisconnect/>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserCard