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
    <h4>
      <span>Food: {Math.floor(resources.food)}; </span>
      <span>Wood: {Math.floor(resources.wood)}; </span>
      <span>Stone: {Math.floor(resources.stone)}; </span>
      <span>Gold: {Math.floor(resources.gold)}; </span>
    </h4>
  );
};

export default Resources;
