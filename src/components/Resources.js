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
    <h4>Food: {resources.food}; Wood: {resources.wood}; Stone: {resources.stone}; Gold: {resources.gold}</h4>
  );
};

export default Resources;
