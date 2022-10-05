import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function UserCard({setIsEdit, isEdit, setAuth}) {
    const [Data, setData] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        let token = document.cookie.split("=").pop()
        console.log(token)
        fetch(`http://localhost:5000/api/hikkers/1?with=paths`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          }})
          .then( res => res.ok ? res.json(): null)
          .then((data) => {
            console.log(data)
            if(data){
                setData(data.data)
            }
          })
          .catch(err => console.log(err))
      }, [])

      const handleEdit = () => {
        setIsEdit(true)
        navigate('/')
      }

      const handleDisconnect = () => {
        //TODO Faire la déconnection
        setAuth(false)
        document.cookie = "Bearer=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
  return (
    <div className="mb-5 col-12 col-lg-4 bg-white bg-opacity-75 text-center rounded p-5">
        <div>
            <p>Votre havre de paix: {Data.hikker?.address}</p>
        </div>
        <div>
            <p>Votre Nom D'utilisateur: {Data.hikker?.username}</p>
        </div>
        <div>
            <p>{Data.paths?.length} chemin{Data.paths?.length < 1 ? "": "s" } vers la liberté enregistré{Data.paths?.length < 1 ? "": "s" }</p> 
        </div>
        <div className='d-flex flex-column mx-5 mt-5'>
            <button className='btn btn-success' onClick={handleEdit}>Voulez-vous créer un nouveau chemin ?</button>
            <button className='btn btn-danger mt-3' onClick={handleDisconnect}>Déconnection</button>
        </div>
    </div>
  )
}

export default UserCard