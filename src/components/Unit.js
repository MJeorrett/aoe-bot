import React from 'react';

import ActionContainer from './ActionContainer';
import PlaceholderAction from './PlaceholderAction';

const Unit = ({
  unit,
  parentActionId,
  timing,
  selectedUnitId,
  selectedActionId,
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
          width: '150px',
          minWidth: '150px',
          height: '40px',
          margin: 0,
          padding: '0.3em',
          backgroundColor: 'lightGrey',
          border: selectedUnitId === unit.id ?
            '2px solid dodgerblue' :
            selectedActionId === parentActionId ?
              '1px solid dodgerblue' :
              null,
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
