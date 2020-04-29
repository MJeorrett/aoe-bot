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

  if (time < 0) {
    return (
      <>
        <h4 style={{ margin: 0, marginBottom: '0.5em' }}>Food: ---; Wood: ---; Stone: ---; Gold: ---;</h4>
        <h4 style={{ margin: 0 }}>Completed Research: []</h4>
      </>
    );
  }

  return (
    <>
      <h4 style={{ margin: 0, marginBottom: '0.5em' }}>
        {renderResource(resources.food, "Food", round) + ' ' +
          renderResource(resources.wood, "Wood", round) + ' ' +
          renderResource(resources.stone, "Stone", round) + ' ' +
          renderResource(resources.gold, "Gold", round)}
      </h4>
      <h4 style={{ margin: 0 }}>Completed Research: {resources.completedResearch.join('; ')}</h4>
    </>
  );
};

export default Resources;
