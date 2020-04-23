import React from 'react';

import * as config from '../config';

import Unit from './Unit';
import Action from './Action';
import ActionSelector from './ActionSelector';

const TownCenter = () => {
  return (
    <Unit title="Town Center">
      <Action title="Create Villager" time={25} />
      <ActionSelector unit={config.unitKeys.townCenter} />
    </Unit>
  );
};

export default TownCenter;
