import React, { useState } from 'react';

import * as config from '../config';

const ActionSelector = ({
  unitKey,
  onSelect,
}) => {
  const [selectedAction, setSelectedAction] = useState('');
  const actionKeys = config.units[unitKey].actions ? Object.keys(config.units[unitKey].actions) || [] : [];
  const actions = actionKeys.map(actionKey => config.units[unitKey].actions[actionKey]);

  const handleSelect = event => {
    onSelect(event.target.value);
    setSelectedAction('');
  };

  return (
    <select value={selectedAction} onChange={handleSelect} tabIndex="-1">
      <option value="" disabled>Add action</option>
      {actions.map(action => (
        <option key={action.key} value={action.key}>{action.name}</option>
      ))}
    </select>
  );
};

export default ActionSelector;
