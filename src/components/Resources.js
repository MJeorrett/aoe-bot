import React from 'react';

const Resources = ({
  resourcesByTime,
  time,
}) => {
  if (!time) {
    return (
      <h4>Food: ---; Wood: ---; Stone: ---; Gold: ---</h4>
    );
  }

  const resources = resourcesByTime[time - 1];
  
  return (
    <h4>Food: {resources.food}; Wood: 200; Stone: 200; Gold: 100</h4>
  );
};

export default Resources;
