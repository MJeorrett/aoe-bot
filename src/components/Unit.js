import React from 'react';

import { placeholderActionType } from '../models/action';

import Action from './Action';
import ContinousActionContainer from './ContinuousActionContainer';
import PlaceholderAction from './PlaceholderAction';
import ActionSelector from './ActionSelector';

const renderAction = action => {
  if (action.type === placeholderActionType) return <PlaceholderAction action={action} />;
  
  if (action.isContinuous) return <ContinousActionContainer key={action.id} action={action} />;

  return <Action key={action.id} action={action} />;
}

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
      {actions.map(renderAction)}
      <ActionSelector unit={unit.key} onSelect={addAction} />
    </div>
  );
};

export default Unit;
