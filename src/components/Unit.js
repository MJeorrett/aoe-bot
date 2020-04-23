import React from 'react';

import Action from './Action';
import ActionSelector from './ActionSelector';

const Unit = ({
  unit,
  actions,
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
      {actions.map(a => <Action key={a.id} action={a} />)}
      <ActionSelector unit={unit.key} onSelect={addAction} />
    </div>
  );
};

export default Unit;
