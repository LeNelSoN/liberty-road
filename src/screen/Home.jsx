import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Map  from '../components/Map/Map';
import PathsPolyline from '../components/Map/PathsPolyline';
import { AuthContext } from '../components/Services/AuthContext'
import { ToFetch } from '../components/Services/ToFetchClass';

const Home = ({isEdit, setMap, setIsEdit}) => {
  const [mapLayers, setMapLayers] = useState([]);
  const [center, setCenter] = useState(null)

  const {auth} = useContext(AuthContext)
  
  const navigate = useNavigate()
  

  useEffect(() => {    
    if(auth.hikkerId !== 0){
      const toFetch = new ToFetch(`/hikkers/${auth.hikkerId}?with=paths`, 'GET')
        toFetch.launch()
          .then(({data:{paths}}) => setMapLayers(paths))
          .catch(err => console.log(err))
    }  
  }, [auth])
  
  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    let center = params.get("center")
    center = center?.split(",")
    setCenter(center || [50,3]) 
  }, [navigate])

  return (
    <>
      {center &&
        <div className='sticky-top'>
          <Map 
            isEdit={isEdit} 
            setMapLayers={setMapLayers}
            center={center}
            hikkerId={auth.hikkerId}
            setMap={setMap}
            setIsEdit={setIsEdit}
            >
            {mapLayers.map((path) => <PathsPolyline key={path?.id} id={path?.id}/>)}
            </Map>
        </div>
        
      }
      

    </>  
    )
}

export default Home