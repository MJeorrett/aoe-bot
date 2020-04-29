import React from 'react';

import constants from '../constants';

const PlaceholderAction = ({
  duration
}) => {
  return (
    <div style={{
      minWidth: `${duration * constants.secondWidth}px`,
      maxWidth: `${duration * constants.secondWidth}px`,
      backgroundColor: '#EEE',
    }} />
  );
};

export default PlaceholderAction;
