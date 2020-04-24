import React from 'react';

import constants from '../constants';

import './TimeSlice.css';

const TimeSlice = ({
  time,
  isSelected,
  setTime,
  setPreviewTime,
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
      onMouseEnter={() => setPreviewTime(time)}
      onMouseLeave={() => setPreviewTime(null)}
      onClick={() => setTime(time)}
      style={isSelected ?
        {
          ...baseStyles,
          backgroundColor: 'dodgerblue',
        } :
        baseStyles
      }
    />
  );
};

export default TimeSlice;
