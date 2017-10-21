import React from 'react';
import { StopListItem } from '../../components';
import './styles.css';

const ListStops = ({ stops }) => (
  <div className="StopList">
    <ul>{
      stops.map(stop => <StopListItem key={stop.id} {...stop} />)
    }</ul>
  </div>
);

export default ListStops;
