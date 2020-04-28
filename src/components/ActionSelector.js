import React, { useState } from 'react';

import * as config from '../config';

const ActionSelector = ({
  unitKey,
  onSelect,
}) => {
  const actions = config.units[unitKey].actions;
  const [selectedAction, setSelectedAction] = useState('');
  const actionKeys = actions ? Object.keys(actions) || [] : [];

  const handleSelect = event => {
    onSelect(actions[event.target.value]);
    setSelectedAction('');
  };

  return (
    <select value={selectedAction} onChange={handleSelect} tabIndex="-1">
      <option value="" disabled>Add action</option>
      {actionKeys.map(actionKey => (
        <option key={actionKey} value={actionKey}>{actions[actionKey].name}</option>
      ))}
    </select>
  );
};

export default ActionSelector;
