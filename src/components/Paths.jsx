import React from 'react'
import {Polyline} from "react-leaflet";

  const Paths = ({mapLayers}) => {
    const handleClickPolyline = (e) => {
        console.log(e);
      };

      const paths = mapLayers.map((layer) => (
    <Polyline
      key={layer.id}
      positions={layer.latlngs}
      onClick={handleClickPolyline}
      eventHandlers= {{click:(e) => console.log(e)}}
    />
))
    return (
     {paths}
    )
  }
  
export default Paths