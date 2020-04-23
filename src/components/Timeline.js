import React from 'react';

import constants from '../constants';

import './Timeline.css';

const Timeline = ({
  time,
  setTime,
}) => {
  const timeSlices = [];
  const times = [];
  for (let i = 1; i <= 500; i++) {
    times.push(i);
  }
  const baseStyles = {
    cursor: 'pointer',
    minWidth: `${constants.secondWidth}px`,
    height: '35px',
    borderLeft: '0.5px solid dodgerblue',
    borderTop: '0.5px solid dodgerblue',
    borderBottom: '0.5px solid dodgerblue',
  };
  times.forEach((t) => {
    timeSlices.push(
      <div
        className="timeslot"
        onClick={() => setTime(t)}
        style={t === time ?
          {
            ...baseStyles,
            backgroundColor: 'blue',
          } :
          baseStyles
        }
      />
    );
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
