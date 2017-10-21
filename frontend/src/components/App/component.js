import React from 'react';
import Notifications from 'react-notify-toast';
import { Map, MainPanel } from '../../components';

import './styles.css';

const AppComponent = (props) => (
  <div className="App">
    <Notifications />
    <div className="App__map-container">
      <Map />
    </div>
    <div className="App__action-container">
      <MainPanel />
    </div>
  </div>
);

export default AppComponent;
