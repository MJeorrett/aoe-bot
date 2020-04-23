import React from 'react';

const Unit = ({
  title,
  children,
}) => {
  return (
    <div style={{
      display: 'flex',
      marginBottom: '10px',
    }}>
      <h3 style={{
        minWidth: '150px',
        height: '35px',
        margin: 0,
        backgroundColor: 'lightGrey',
      }}>{title}</h3>
      {children}
    </div>
  );
};

export default Unit;
