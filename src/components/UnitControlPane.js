import React from 'react';

import ActionSelectorContainer from './ActionSelectorContainer';

const UnitControlPane = ({
  unit,
  unitTiming,
  actionIds,
  addAction,
  latestActionTiming,
}) => {
  const latestTimeOffset = latestActionTiming ?
    latestActionTiming.timeOffset + latestActionTiming.time :
    unitTiming.timeOffset;

  const handleAddAction = actionKey => {
    addAction(actionKey, actionIds[actionIds.length - 1] || null, unit.key);
  };

  return (
    <>
      <h3 style={{ marginTop: 0 }}>Unit: {unit.name}</h3>
      <ActionSelectorContainer unitKey={unit.key} onSelect={handleAddAction} timeOffset={latestTimeOffset} />
    </>
  );
};

export default UnitControlPane;
