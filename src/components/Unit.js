import React from 'react';

import ActionContainer from './ActionContainer';
import PlaceholderAction from './PlaceholderAction';

const Unit = ({
  unit,
  parentActionId,
  timing,
  actionIds,
  addAction,
  select,
}) => {
  

  return (
    <div
      style={{
        display: 'flex',
        marginBottom: '10px',
      }}
    >
      <h3
        style={{
          minWidth: '150px',
          height: '35px',
          margin: 0,
          backgroundColor: 'lightGrey',
          cursor: 'pointer',
        }}
        onClick={select}
      >
        {unit.name}
      </h3>
      {timing.timeOffset > 0 && <PlaceholderAction duration={timing.timeOffset} />}
      {actionIds.map(actionId => (
        <ActionContainer key={actionId} unitId={unit.id} id={actionId} />
      ))}
    </div>
  );
};

export default Unit;
