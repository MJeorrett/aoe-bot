import React from 'react';
import TownCenter from './components/TownCenter';
import Villager from './components/Villager';
import Resources from './components/Resources';
import Timeline from './components/Timeline';

function App() {
  return (
    <div style={{ overflowX: 'scroll' }}>
      <h1>Age of Empires Build Order Tool</h1>
      <Resources />
      <Timeline />
      <TownCenter />
      <Villager />
      <Villager />
      <Villager />
    </div>
  );
}

export default App;
