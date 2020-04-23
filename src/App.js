import React from 'react';
import TownCenter from './components/TownCenter';
import Villager from './components/Villager';
import Resources from './components/Resources';

function App() {
  return (
    <div>
      <h1>Age of Empires Build Order Tool</h1>
      <Resources />
      <TownCenter />
      <Villager />
      <Villager />
      <Villager />
    </div>
  );
}

export default App;
