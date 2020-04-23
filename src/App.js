import React from 'react';
import { Provider } from 'react-redux';

import store from './store';

import Resources from './components/Resources';
import Timeline from './components/Timeline';
import UnitsContainer from './components/UnitsContainer';

function App() {
  return (
    <Provider store={store}>
      <div style={{ overflowX: 'scroll' }}>
        <h1>Age of Empires Build Order Tool</h1>
        <Resources />
        <Timeline />
        <UnitsContainer />
      </div>
    </Provider>
  );
}

export default App;
