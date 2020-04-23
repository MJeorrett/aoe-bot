import React from 'react';

import constants from '../constants';
import * as config from '../config';

const Action = ({
  action: {
    type: actionType,
  },
}) => {
  const action = config.actions[actionType];
  return (
    <h4 style={{
      margin: 0,
      border: '1px solid lightgreen',
      minWidth: `${action.time * constants.secondWidth}px`,
      maxWidth: `${action.time * constants.secondWidth}px`,
    }}>{action.name}</h4>
  );
};

export default Action;
