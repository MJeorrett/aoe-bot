import React from 'react';

const renderResource = (name, value, isContinuous) => {
  let text;
  if (value === null || value === undefined) {
    text = '-';
  }
  else {
    text = `${value}${isContinuous ? ' per second' : ''}`;
  }

  return <p style={{ margin: 0 }}>{name}: {text}</p>;
};

const ControlPanel = ({
  selectedAction,
}) => {
  const renderContent = () => {
    if (!selectedAction) return <p style={{ margin: 0 }}>Select an action...</p>;

    return (
      <>
        <h3 style={{ marginTop: 0 }}>Action: {selectedAction.name}</h3>
        <p>Duration: {selectedAction.time} seconds</p>
        {renderResource('Food', selectedAction.food, selectedAction.isContinuous)}
        {renderResource('Wood', selectedAction.wood, selectedAction.isContinuous)}
        {renderResource('Stone', selectedAction.stone, selectedAction.isContinuous)}
        {renderResource('Gold', selectedAction.gold, selectedAction.isContinuous)}
      </>
    )
  };

  return (
    <div style={{
      border: '1px solid dodgerblue',
      minWidth: '200px',
      padding: '1em',
    }}>
      {renderContent()}
    </div>
  );
};

export default ControlPanel;
