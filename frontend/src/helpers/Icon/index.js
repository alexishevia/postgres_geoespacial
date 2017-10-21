import L from 'leaflet';

import markerShadow from './img/marker-shadow.png';
import black from './img/marker-icon-2x-black.png';
import blue from './img/marker-icon-2x-blue.png';
import green from './img/marker-icon-2x-green.png';
import grey from './img/marker-icon-2x-grey.png';
import orange from './img/marker-icon-2x-orange.png';
import red from './img/marker-icon-2x-red.png';
import violet from './img/marker-icon-2x-violet.png';
import yellow from './img/marker-icon-2x-yellow.png';

const colors = { black, blue, green, grey, orange, red, violet, yellow };

export default ({ color }) => (
  new L.Icon({
    iconUrl: colors[color] || blue,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
)
