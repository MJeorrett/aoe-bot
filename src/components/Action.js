import React from 'react';

import constants from '../constants';

const Action = ({
  title,
  time,
}) => {
  return (
    <h4 style={{
      margin: 0,
      border: '1px solid lightgreen',
      minWidth: `${time * constants.secondWidth}px`,
      maxWidth: `${time * constants.secondWidth}px`,
    }}>{title}</h4>
  );
};

export default Action;
