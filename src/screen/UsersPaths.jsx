import React, { useEffect, useState } from 'react'
import BtnDisconnect from '../components/Button/BtnDisconnect';
import PathCard from '../components/Map/PathCard';
import { doFetch } from '../components/Services/doFetch';

const UsersPaths = () => {

  const [paths, setPaths] = useState([]);

  useEffect(() => {

    doFetch(`/paths`, 'GET')
    .then(({data}) => {
      console.log(data)
      setPaths(data)
    })

  }, [])
  

  return (
    <div className='container'>
      <BtnDisconnect/>
      {
        paths.map(path => {
          return <PathCard 
                    key={path.name+" "+path.id} 
                    id={path.id}
                    name={path.name} 
                    description={path.description} 
                    createdAt={path.createdAt}
                    withNavigate={false}
                  />
        })
      }
    </div>
  )
}

export default UsersPaths