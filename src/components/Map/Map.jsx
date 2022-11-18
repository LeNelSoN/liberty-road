import {
  MapContainer,
  LayersControl,
  FeatureGroup,
  Polyline,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "../../../node_modules/leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import Tiles from "./Tiles";
import { AuthContext } from '../../components/Services/AuthContext'
import { useContext, useState } from "react";
import ModalNewPath from "../Modal/ModalNewPath";
import Confirm from "../Modal/Confirm";
import { ToFetch } from "../../components/Services/ToFetchClass";


function Map({center, mapLayers , setMapLayers, setMap, isEdit, setIsEdit, thumbnail = false, zoom = 9 ,children}) {

  const {auth} = useContext(AuthContext)
  const [show, setShow] = useState(false)
  const [pathName, setPathName] = useState("")
  const [bodyToFetch, setBodyToFetch] = useState("")
  const [disabledBtn, setDisabledBtn] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [message, setMessage] = useState('')

  const onCreate = (e) => {
    const { layerType, layer } = e;
    if (layerType === "polyline") {

      const pathData = auth.formData

      setPathName(pathData.name)
      setShow(true)

      let latlongs = []
      layer.getLatLngs()?.map(({lat,lng}) => latlongs.push({latitude:lat, longitude:lng})  )

      const body = {pathData , latlongs}
      setBodyToFetch(body)
      console.log(body)
      console.log(auth)
    }
  };
  
  const handleClickCreatePath = () => {
    
    let BodyToFetch = {
      name: bodyToFetch.pathData.name,
      description: bodyToFetch.pathData.description,
      hikkerId: auth.hikkerId,
      latlongs: bodyToFetch.latlongs
    }

    setDisabledBtn(true)
    setIsEdit(!isEdit)

    const toFetch = new ToFetch('/paths', 'POST', BodyToFetch);
    toFetch.launch()
      .then((json) => {
        if(json){
          setShow(false)
          setShowConfirm(true)
          setTimeout(() => {
            setShowConfirm(false)
            setDisabledBtn(false)
          }, 2500);
          setMessage(json.message)
        }
      })
      .catch(err => console.log(err))

  }

  const onUpdate = (e) => {
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).forEach(({ _leaflet_id, editing }) => {
      setMapLayers((layers) =>
        layers.filter((layer) =>
          layer.id === _leaflet_id
            ? { ...layer, latlngs: { ...editing.latlngs[0] } }
            : layer
          )
        );
      });
    };

  const onDeleted = (e) => {
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).forEach(({ _leaflet_id }) => {
      setMapLayers((layers) =>
        layers.filter((layer) => layer.id !== _leaflet_id)
      );
    });
  };

  mapLayers?.map((layer) => onCreate(layer));
  
  const handleClickPolyline = (e) => {
    console.log(e);
  };
  
  const Path = mapLayers?.map((layer) => (
    <Polyline
      key={layer?.id}
      positions={layer?.latlngs}
      onClick={handleClickPolyline}
      eventHandlers= {{click:(e) => console.log(e)}}
    />
  ));

  return (
    <>
    <Confirm show={showConfirm} setShow={setShowConfirm} message={message} title={'Creation de Chemin'}/>
    <ModalNewPath disabledBtn={disabledBtn} show={show} setShow={setShow} message={pathName} handleClickCreatePath={handleClickCreatePath}/>
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      doubleClickZoom={false}
      ref={setMap}
      className={thumbnail ? 'card-height': 'l-container'}
    >
    <LayersControl position="topright">{<Tiles />}</LayersControl>
    {isEdit &&  
    <FeatureGroup>
      <EditControl
        position="topright"
        onCreated={onCreate}
        onEdited={onUpdate}
        onDeleted={onDeleted}
        draw={{
          rectangle: false,
          polygon: false,
          circle: false,
          circlemarker: false,
          polyline: true,
          marker: false,
        }}
      />
    </FeatureGroup>
      } 
      {Path}
      {children}
    </MapContainer>
    </>
  );
}

export default Map;
