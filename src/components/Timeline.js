import React from 'react';
import repeat from '../utils/repeat';

const Timeline = () => {
  const timeSlices = [];
  repeat(500, () => timeSlices.push(<div style={{
    minWidth: '5px',
    height: '35px',
    border: '0.5px solid dodgerblue'
  }} />));

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
