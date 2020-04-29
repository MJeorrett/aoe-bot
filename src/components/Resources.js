import React from 'react';

const renderResource = (value, title, round) => (
  `${title}: ${round ? Math.floor(value) : value};`
);

const Resources = ({
  resourcesByTime,
  time,
}) => {
  const resources = resourcesByTime[time];
  const round = false;

  const renderContent = () => {
    if (time < 0) {
      return (
        'Food: ---; Wood: ---; Stone: ---; Gold: ---;'
      );
    }

    return (
      renderResource(resources.food, "Food", round) + ' ' +
      renderResource(resources.wood, "Wood", round) + ' ' +
      renderResource(resources.stone, "Stone", round) + ' ' +
      renderResource(resources.gold, "Gold", round)
    );
  };

  return (
    <h4 style={{ marginTop: 0 }}>
      {renderContent()}
    </h4>
  );
};

export default Resources;
