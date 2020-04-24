import React from 'react';

const renderResource = (value, title, round) => (
  <span>{title}: {round ? Math.floor(value) : value}; </span>
);

const Resources = ({
  resourcesByTime,
  time,
}) => {
  if (time < 0) {
    return (
      <h4>Food: ---; Wood: ---; Stone: ---; Gold: ---</h4>
    );
  }

  const resources = resourcesByTime[time];

  const round = false;

  return (
    <h4>
      {renderResource(resources.food, "Food", round)}
      {renderResource(resources.wood, "Wood", round)}
      {renderResource(resources.stone, "Stone", round)}
      {renderResource(resources.gold, "Gold", round)}
    </h4>
  );
};

export default Resources;
