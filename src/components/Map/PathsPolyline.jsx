import React, { useEffect, useState } from 'react'
import { Polyline, Popup } from 'react-leaflet'
import { ToFetch } from '../Services/ToFetchClass';

const PathsPolyline = ({id}) => {

  const [latlngs, setLatlongs] = useState([])
  const [polylineState, setPolylineState] = useState("")

  useEffect(() => {
    
    const toFetch = new ToFetch(`/paths/${id}?with=latlongs`, 'GET')
    toFetch.launch()
      .then(({data:{latlongs}}) => {
        if(latlongs){
          setLatlongs([latlongs])
        }
      })
  }, [id])



  return (
    <Polyline
      key={id}
      positions={latlngs}
      onClick={(e) => {
        setPolylineState(e)
        console.log(e)
        }}
      eventHandlers= {{click:(e) => console.log(e)}}
    >
      <Popup>
      <p>{polylineState}</p>
      </Popup>
    </Polyline>  )
}

export default PathsPolyline