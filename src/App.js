import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import seedStore from './seedStoreWithDefaultUnits';

import ResourcesContainer from './components/ResourcesContainer';
import TimelineContainer from './components/TimelineContainer';
import UnitsContainer from './components/UnitsContainer';
import ControlPanelContainer from './components/ControlPanelContainer';

seedStore(store);

function App() {
  return (
    <Provider store={store}>
      <h1 style={{ textAlign: 'center', color: 'darkblue' }}>Age of Empires Build Order Tool</h1>
      <div style={{
        display: 'flex',
      }}>
        <div style={{
          overflowX: 'scroll',
          margin: '1em',
          marginRight: 0,
          padding: '1em',
          border: '1px solid dodgerblue',
        }}>
          <ResourcesContainer />
          <TimelineContainer />
          <UnitsContainer />
        </div>
        <div style={{ margin: '1em' }}>
          <ControlPanelContainer />
        </div>
      </div>
    </Provider>
  );
}

export default App;
