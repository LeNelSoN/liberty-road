import React, { useContext, useEffect, useState } from 'react'
import ErrConnected from '../components/ErrConnected'
import PathCard from '../components/Map/PathCard'
import { AuthContext } from '../components/Services/AuthContext'
import { doFetch } from '../components/Services/doFetch'

const Paths = () => {
  const{auth} = useContext(AuthContext)

  const [statePaths, setPaths] = useState([])

  useEffect(() => {

    if(auth.hikkerId !== 0){

      doFetch(`/hikkers/${auth.hikkerId}?with=paths`, 'GET')
        .then( ({data:{paths}}) => {
          setPaths(paths)
        } )
        .catch(err => console.error(err))

    }
    }, [auth])

  const CartRender = 
    statePaths.length > 0 ? 
      statePaths?.map(item => 
        <PathCard 
          key={item.id} 
          id={item.id} 
          name={item.name} 
          description={item.description} 
          createdAt={item.createdAt}/>)
      : 
      <ErrConnected description={"Vous n'avez pas encore de chemin"}/>

  return (
    <div className='bckgnd'>
      <div className={` ${!auth.logged ? 'h-90':''} ${statePaths.length === 0 ? 'h-90':''}`}  >
          {auth.logged ? statePaths && CartRender  : <ErrConnected description={'Vous devez etre connecté pour avoir acces à vos parcours'}/>} 
      </div>
    </div>
  )
  }

export default Paths