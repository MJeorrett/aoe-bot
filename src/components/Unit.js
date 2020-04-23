import React from 'react';
import repeat from '../utils/repeat';

const Unit = ({
  title,
}) => {
  const timeSlices = [];
  repeat(100, () => timeSlices.push(<div style={{
    width: '4px',
    height: '34px',
    border: '0.5px solid dodgerblue'
  }} />));

  return (
    <div style={{
      display: 'flex',
      marginBottom: '10px'
    }}>
      <h3 style={{
        margin: 0,
        width: '150px',
        height: '35px',
        backgroundColor: 'lightBlue'
      }}>
        {title}
      </h3>
      {timeSlices}
    </div>
  );
};

export default Unit;
