import React, { useState } from 'react';

import * as config from '../config';

const filterActionKeyssByPrerequisites = (actionKeys, actionConfigs, currentResources) => {
  return actionKeys.filter(actionKey => {
    const actionConfig = actionConfigs[actionKey];
    if (actionConfig.prerequisiteBuildings) {
      const completedRequiredBuildings = currentResources.completedUnits
        .filter(completedBuildingKey => actionConfig.prerequisiteBuildings.keys.includes(completedBuildingKey));
      
      return completedRequiredBuildings.length >= actionConfig.prerequisiteBuildings.count;
    }
    return true;
  });
}

const ActionSelector = ({
  unitKey,
  onSelect,
  currentResources,
}) => {
  const [selectedAction, setSelectedAction] = useState('');
  
  const actionConfigs = config.units[unitKey].actions;  
  const allActionKeys = actionConfigs ? Object.keys(actionConfigs) || [] : [];

  const actionKeys = filterActionKeyssByPrerequisites(allActionKeys, actionConfigs, currentResources);

  const handleSelect = event => {
    onSelect(actionConfigs[event.target.value]);
    setSelectedAction('');
  };

  return (
    <select value={selectedAction} onChange={handleSelect} tabIndex="-1">
      <option value="" disabled>Add action</option>
      {actionKeys.map(actionKey => (
        <option key={actionKey} value={actionKey}>{actionConfigs[actionKey].name}</option>
      ))}
    </select>
  );
};

export default ActionSelector;
