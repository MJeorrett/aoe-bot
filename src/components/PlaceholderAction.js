import React from 'react';

import constants from '../constants';

const PlaceholderAction = ({
  action,
  setTime,
}) => {
  return (
    <div style={{
      minWidth: `${action.time * constants.secondWidth}px`,
      maxWidth: `${action.time * constants.secondWidth}px`,
    }} />
  );
};

export default PlaceholderAction;
