import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import seedStore from './seedStoreWithDefaultUnits';

import ResourcesContainer from './components/ResourcesContainer';
import TimelineContainer from './components/TimelineContainer';
import UnitsContainer from './components/UnitsContainer';
import ControlPanelContainer from './components/ControlPanelContainer';

seedStore(store);

const AppPanel = ({
  style,
  children,
}) => (
  <div style={{
    margin: '1em',
    padding: '1em',
    border: '1px solid dodgerblue',
    ...style,
  }}>
    {children}
  </div>
);

function App() {
  return (
    <Provider store={store}>
      <h1 style={{ textAlign: 'center', color: 'darkblue' }}>Age of Empires Build Order Tool</h1>
      <div style={{
        display: 'flex',
      }}>
        <div style={{ minWidth: 0 }}>
          <AppPanel style={{ marginRight: 0, overflowX: 'scroll' }}>
            <ResourcesContainer />
          </AppPanel>
          <AppPanel style={{
            overflowX: 'scroll',
            marginRight: 0,

          }}>
            <TimelineContainer />
            <UnitsContainer />
          </AppPanel>
        </div>
        <AppPanel style={{ minWidth: '250px' }}>
          <ControlPanelContainer />
        </AppPanel>
      </div>
    </Provider>
  );
}

export default App;
