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
  action,
  actionTiming,
  setActionDuration,
  deleteAction,
}) => {
  const renderDuration = () => (
    action.isContinuous ?
      <input
        style={{
          minWidth: '0px',
        }}
        type="number"
        min="1"
        step="1"
        value={actionTiming.time}
        onChange={event => setActionDuration(parseInt(event.target.value))}
      /> :
      action.time
  );

  return (
    <>
      <h3 style={{ marginTop: 0 }}>Action: {action.name}</h3>
      <p>Duration: {renderDuration()} seconds</p>
      {renderResource('Food', action.food, action.isContinuous)}
      {renderResource('Wood', action.wood, action.isContinuous)}
      {renderResource('Stone', action.stone, action.isContinuous)}
      {renderResource('Gold', action.gold, action.isContinuous)}
      <br />
      <button
        style={{
          color: 'red',
          borderColor: 'red',
          cursor: 'pointer',
        }}
        onClick={deleteAction}
      >
        Delete
        </button>
    </>
  );
};

export default ControlPanel;
