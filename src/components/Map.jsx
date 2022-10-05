import {
  MapContainer,
  LayersControl,
  FeatureGroup,
  Polyline,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "../../node_modules/leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { useEffect, useState } from "react";
import Tiles from "./Tiles";

const center = [50.15, 3.35];

function Map({ setMap , isEdit }) {
  
  useEffect(() => {
    let initMapLayer = localStorage.getItem("Leaflet-paths")//fetch
      ? JSON.parse(localStorage.getItem("Leaflet-paths"))
      : [];
      setMapLayers(initMapLayer)
  }, [])
  
  const [mapLayers, setMapLayers] = useState([]);

  const onCreate = (e) => {
    const { layerType, layer } = e;
    if (layerType === "polyline") {
      const { _leaflet_id } = layer;

      setMapLayers((layers) => [
        ...layers,
        { id: _leaflet_id, latlngs: layer.getLatLngs() },
      ]);
    }
  };

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

  mapLayers.map((layer) => onCreate(layer));

  const handleClickPolyline = (e) => {
    console.log(e);
  };

  localStorage.setItem("Leaflet-paths", JSON.stringify(mapLayers));

  const Paths = mapLayers.map((layer) => (
    <Polyline
      key={layer.id}
      positions={layer.latlngs}
      onClick={handleClickPolyline}
      eventHandlers= {{click:(e) => console.log(e)}}
    />
  ));


  return (
    <MapContainer
      center={center}
      zoom={9}
      scrollWheelZoom={true}
      doubleClickZoom={false}
      ref={setMap}
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
      {Paths}
    </MapContainer>
  );
}

export default Map;
