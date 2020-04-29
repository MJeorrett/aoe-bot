import React from 'react';

import ActionSelector from './ActionSelector';

const UnitControlPane = ({
  unit,
  actionIds,
  addAction,
}) => {
  const handleAddAction = actionKey => {
    addAction(actionKey, actionIds[actionIds.length - 1] || null, unit.key);
  };

  return (
    <>
      <h3 style={{ marginTop: 0 }}>Unit: {unit.name}</h3>
      <ActionSelector unitKey={unit.key} onSelect={handleAddAction} />
    </>
  );
};

export default UnitControlPane;
