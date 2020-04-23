import React from 'react';

import TimeSlice from './TimeSlice';

const Timeline = ({
  time,
  setTime,
}) => {
  const timeSlices = [];
  const times = [];
  for (let i = 1; i <= 500; i++) {
    times.push(i);
  }
  
  times.forEach((t) => {
    timeSlices.push(
      <TimeSlice
        key={t}
        time={t}
        isSelected={time === t}
        setTime={setTime}
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
