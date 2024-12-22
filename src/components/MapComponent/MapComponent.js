import React from 'react';
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';

const Map = (props) => {
  const centerPoint = [
    35.694004,
    139.753632,
  ];

  return <MapContainer
    center={centerPoint}
    zoom={5}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {
      props.mapData.map((data) => {
        console.log(data.point);
        return (
          <Marker position={[data.point.latitude, data.point.longitude]} key={[data.point.latitude, data.point.longitude]}>
            <Popup>
              {data.name}
            </Popup>
          </Marker>
        )
      })
    }
  </MapContainer>
};

export default Map;
