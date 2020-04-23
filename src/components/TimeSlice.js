import React from 'react';

import constants from '../constants';

import './TimeSlice.css';

const baseStyles = {
  cursor: 'pointer',
  minWidth: `${constants.secondWidth}px`,
  height: '35px',
  borderLeft: '0.5px solid dodgerblue',
  borderTop: '0.5px solid dodgerblue',
  borderBottom: '0.5px solid dodgerblue',
};

const TimeSlice = ({
  time,
  isSelected,
  setTime,
}) => {
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
