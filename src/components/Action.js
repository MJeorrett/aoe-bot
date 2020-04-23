import React from 'react';

import constants from '../constants';
import * as config from '../config';

const Action = ({
  action: {
    type: actionType,
    timeOffset,
  },
}) => {
  const action = {
    timeOffset,
    ...config.actions[actionType],
  };
  return (
    <div style={{
      border: '0.5px solid green',
      color: 'green',
      backgroundColor: 'lightgreen',
      minWidth: `${action.time * constants.secondWidth}px`,
      maxWidth: `${action.time * constants.secondWidth}px`,
    }}>
      <h4 style={{
        margin: 0,
      }}>{action.name}</h4>
      <p style={{
        margin: 0,
        fontSize: 14,
      }}>{`${action.timeOffset + 1} >> ${action.timeOffset + action.time}`}</p>
    </div>
  );
};

export default Action;
