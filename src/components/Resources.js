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
        <>
          <p>Food: ---; Wood: ---; Stone: ---; Gold: ---;</p>
          <p>Completed Research: []</p>
        </>
      );
    }

    return (
      <>
        <p>
          {renderResource(resources.food, "Food", round) + ' ' +
            renderResource(resources.wood, "Wood", round) + ' ' +
            renderResource(resources.stone, "Stone", round) + ' ' +
            renderResource(resources.gold, "Gold", round)}
        </p>
        <p style={{ marginBottom: 0 }}>Completed Research:{resources.completedResearch.length === 0 && ' None'}</p>
        {resources.completedResearch.length > 0 &&
          (
            <ul>
              {resources.completedResearch.map(cr => (
                <li>{cr}</li>
              ))}
            </ul>
          )}
      </>
    );
  };

  return (
    <h4 style={{ marginTop: 0 }}>
      {renderContent()}
    </h4>
  );
};

export default Resources;
