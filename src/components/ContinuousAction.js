import React, { useState } from 'react';

import constants from '../constants';

const ContinuousAction = ({
  action,
  setTime,
  remove,
  select
}) => {
  const [cachedTime, setCachedTime] = useState(action.time);

  return (
    <div
      style={{
        border: '0.5px solid green',
        color: 'green',
        backgroundColor: 'lightgreen',
        minWidth: `${action.time * constants.secondWidth}px`,
        maxWidth: `${action.time * constants.secondWidth}px`,
      }}
      onClick={select}
      onDoubleClick={remove}
    >
      <h4 style={{
        margin: 0,
      }}>{action.name}</h4>
      <p style={{
        flexShrink: 0,
        margin: 0,
        fontSize: 14,
      }}>{`${action.timeOffset} >> ${action.timeOffset + action.time}`}</p>
      <label>
        Duration:
        <input
          style={{
            width: '50px',
            border: '0.5px solid green',
            color: 'green',
            backgroundColor: 'lightgreen',
            marginLeft: '5px',
          }}
          type="number"
          min="10"
          max="1000"
          step="1"
          value={cachedTime}
          onChange={event => setCachedTime(event.target.time)}
          onBlur={event => setTime(parseInt(event.target.value))}
        />
      </label>
    </div>
  );
};

export default ContinuousAction;
