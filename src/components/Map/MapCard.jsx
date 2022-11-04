import React, { useEffect, useState } from 'react'
import Map from './Map'
import PathsPolyline from './PathsPolyline'
import { useNavigate } from 'react-router-dom'
import { ToFetch } from '../../components/Services/ToFetchClass'

const MapCard = ({id}) => {

    const [center, setCenter] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
      
        const toFetch = new ToFetch(`/paths/${id}?with=latlongs`, 'GET');
        toFetch.launch()
          .then(({data:{latlongs}}) => {
            console.log(latlongs[0])
            if(latlongs){
                setCenter(latlongs[0])
            }
          })
      }, [id])

  return (
    <>
    {
        center && 
        <div onClick={() => navigate(`/?center=${center}`)}>
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