import React, { useState } from 'react';

import * as config from '../config';

const ActionSelector = ({
  unit,
  onSelect,
}) => {
  const [selectedAction, setSelectedAction] = useState('');
  const actions = config.units[unit].actions
    .map(actionKey => ({
      key: actionKey,
      name: config.actions[actionKey].name,
    }));

  const handleSelect = event => {
    onSelect(event.target.value);
    setSelectedAction('');
  };

  return (
    <select value={selectedAction} onChange={handleSelect}>
      <option value="" disabled>Add action</option>
      {actions.map(action => (
        <option key={action.key} value={action.key}>{action.name}</option>
      ))}
    </select>
  );
};

export default ActionSelector;
