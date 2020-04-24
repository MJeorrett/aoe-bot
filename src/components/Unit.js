import React from 'react';

import ActionContainer from './ActionContainer';
import ActionSelector from './ActionSelector';

const Unit = ({
  unit,
  actionIds,
  addAction,
}) => {
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
      {actionIds.map(actionId => (
        <ActionContainer key={actionId} unitId={unit.id} id={actionId} />
      ))}
      <ActionSelector unit={unit.key} onSelect={addAction} />
    </div>
  );
};

export default Unit;
