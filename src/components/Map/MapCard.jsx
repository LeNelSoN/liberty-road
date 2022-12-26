import React, { useEffect, useState } from 'react'
import Map from './Map'
import PathsPolyline from './PathsPolyline'
import { useNavigate } from 'react-router-dom'
import { doFetch } from '../Services/doFetch'

const MapCard = ({id, withNavigate = true}) => {

    const [center, setCenter] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
      
        doFetch(`/paths/${id}?with=latlongs`, 'GET')
          .then(({data:{latlongs}}) => {
            console.log(latlongs[0])
            if(latlongs){
                setCenter(latlongs[0])
            }
          })
      }, [id])

    const handleClick = () => {
        navigate(`/?center=${center}`)
    }
    
  return (
    <>
    {
        center && 
        <div onClick={withNavigate && handleClick}>
            <Map 
                thumbnail={true} 
                zoom={12} 
                center={center}
            >
                <PathsPolyline key={id} id={id}/>
            </Map>  
        </div>      
    }

    </>
    )
}

export default MapCard