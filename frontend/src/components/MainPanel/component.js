import React from 'react';
import { Welcome, Search, StopList, EditStop } from '../../components';

export default ({ hasActiveStop }) => (
  <div>
    {
      hasActiveStop ?
        <EditStop />
        :
        <div>
          <Welcome />
          <Search />
          <StopList />
        </div>
    }
  </div>
);
