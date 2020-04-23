import React from 'react';

import { secondWidth } from '../constants';

const Action = ({
  title,
  time,
}) => {
  return (
    <h4 style={{
      fontSize: '14px',
      margin: 0,
      border: '1px solid lightgreen',
      minWidth: `${time * secondWidth}px`,
      maxWidth: `${time * secondWidth}px`,
    }}>{title}</h4>
  );
};

export default Action;
