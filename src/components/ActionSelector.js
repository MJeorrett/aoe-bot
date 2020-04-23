import React from 'react';

import * as config from '../config';

const ActionSelector = ({
  unit,
}) => {
  const actions = config.units[unit].actions
    .map(actionName => config.actions[actionName]);
  
  return (
    <select>
      {actions.map(action => (
        <option key={action.key} value={action.key}>{action.name}</option>
      ))}
    </select>
  );
};

export default ActionSelector;
