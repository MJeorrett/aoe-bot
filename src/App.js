import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import seedStore from './seedStoreWithDefaultUnits';

import ResourcesContainer from './components/ResourcesContainer';
import TimelineContainer from './components/TimelineContainer';
import UnitsContainer from './components/UnitsContainer';

seedStore(store);

function App() {
  return (
    <Provider store={store}>
      <div style={{ overflowX: 'scroll' }}>
        <h1>Age of Empires Build Order Tool</h1>
        <ResourcesContainer />
        <TimelineContainer />
        <UnitsContainer />
      </div>
    </Provider>
  );
}

export default App;
