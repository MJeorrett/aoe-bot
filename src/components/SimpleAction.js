import React from 'react';

import constants from '../constants';

const SimpleAction = ({
  action,
  remove,
}) => {
  return (
    <div style={{
      border: '0.5px solid green',
      color: 'green',
      backgroundColor: 'lightgreen',
      minWidth: `${action.time * constants.secondWidth}px`,
      maxWidth: `${action.time * constants.secondWidth}px`,
    }}>
      <h4
        style={{
          margin: 0,
        }}
        onDoubleClick={remove}
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

export default SimpleAction;
