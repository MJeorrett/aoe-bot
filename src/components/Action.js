import React from 'react';

import constants from '../constants';

const Action = ({
  action,
  select,
}) => {
  return (
    <div
      style={{
        border: '0.5px solid green',
        color: 'green',
        backgroundColor: 'lightgreen',
        minWidth: `${action.time * constants.secondWidth}px`,
        maxWidth: `${action.time * constants.secondWidth}px`,
      }}
      onClick={select}
    >
      <h4
        style={{
          margin: 0,
        }}
      >
        {action.name}
      </h4>
      <p style={{
        margin: 0,
        fontSize: 14,
      }}>{`${action.timeOffset} >> ${action.timeOffset + action.time}`}</p>
    </div>
  );
};

export default Action;
