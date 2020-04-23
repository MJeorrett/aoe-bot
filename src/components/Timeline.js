import React from 'react';

import repeat from '../utils/repeat';
import constants from '../constants';

const Timeline = () => {
  const timeSlices = [];
  let key = 0;
  repeat(500, () => {
    timeSlices.push(<div key={key} style={{
      minWidth: `${constants.secondWidth}px`,
      height: '35px',
      borderLeft: '0.5px solid dodgerblue',
      borderTop: '0.5px solid dodgerblue',
      borderBottom: '0.5px solid dodgerblue',
    }} />);
    key++;
  });

  return (
    <div style={{
      display: 'flex',
      marginBottom: '10px'
    }}>
      <h3 style={{
        margin: 0,
        minWidth: '150px',
        height: '35px',
        backgroundColor: 'lightBlue'
      }}>
        Timeline:
      </h3>
      {timeSlices}
    </div>
  );
};

export default Timeline;
