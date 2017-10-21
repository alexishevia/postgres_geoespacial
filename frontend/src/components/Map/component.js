import React from 'react';
import { Map, TileLayer, Circle } from 'react-leaflet';
import { StopMarker } from '../../components';

import 'leaflet/dist/leaflet.css';

/*
 * Choose between OpenStreetMap or the local tiles server for serving the base
 * map layer.
 */
// const mapURL = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'; // OpenStreetMap
const mapURL = 'http://localhost:3002/styles/osm-bright/{z}/{x}/{y}.png'; // Local Tiles Server

const MapComponent = (props) => {
  const {
    stops, center, zoom, radius, advancedSearchActive, onClick, onMove,
  } = props;

  return (
    <Map center={center} zoom={zoom} onClick={onClick} onMoveend={onMove} >
      <TileLayer url={ mapURL } />
      {
        advancedSearchActive && radius > 0 ?
          <Circle center={center} radius={radius} color="#C646C1" />
          : null
      }
      { stops.map(stop => <StopMarker key={stop.id} {...stop} />) }
    </Map>
  );
}

export default MapComponent;
