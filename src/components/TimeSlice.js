import React from 'react';

import constants from '../constants';

import './TimeSlice.css';

const TimeSlice = ({
  time,
  isSelected,
  setTime,
}) => {
  const baseStyles = {
    cursor: 'pointer',
    minWidth: `${constants.secondWidth}px`,
    height: time% 60 === 0 ? '45px' : '35px',
    borderLeft: '0.25px solid dodgerblue',
    borderRight: '0.25px solid dodgerblue',
    borderTop: '0.5px solid dodgerblue',
    borderBottom: '0.5px solid dodgerblue',
  };
  return (
    <div
      className="timeslot"
      onClick={() => setTime(time)}
      style={isSelected ?
        {
          ...baseStyles,
          backgroundColor: 'blue',
        } :
        baseStyles
      }
    />
  );
};

export default TimeSlice;
