import React from 'react';

import ActionContainer from './ActionContainer';
import ActionSelector from './ActionSelector';
import PlaceholderAction from './PlaceholderAction';

const Unit = ({
  unit,
  timing,
  actionIds,
  addAction,
}) => {
  const handleAddAction = actionKey => {
    addAction(actionKey, actionIds[actionIds.length - 1] || null);
  };
  
  return (
    <div style={{
      display: 'flex',
      marginBottom: '10px',
    }}>
      <h3 style={{
        minWidth: '150px',
        height: '35px',
        margin: 0,
        backgroundColor: 'lightGrey',
      }}>{unit.name}</h3>
      {timing.timeOffset > 0 && <PlaceholderAction duration={timing.timeOffset} />}
      {actionIds.map(actionId => (
        <ActionContainer key={actionId} unitId={unit.id} id={actionId} />
      ))}
      <ActionSelector unit={unit.key} onSelect={handleAddAction} />
    </div>
  );
};

export default Unit;
