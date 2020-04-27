import React from 'react';

import constants from '../constants';

import TimeSlice from './TimeSlice';

const buildTimes = maxTime => {
  const times = [];
  for (let i = 0; i <= constants.maxTime; i++) {
    times.push(i);
  }
  return times;
};

const Timeline = ({
  time,
  previewTime,
  setTime,
  setPreviewTime,
  resources,
}) => {
  const times = buildTimes(constants.maxTime);

  const renderTimeSlices = () => times.map(t => (
    <TimeSlice
      key={t}
      time={t}
      isSelected={time === t}
      setTime={setTime}
      setPreviewTime={setPreviewTime}
    />
  ));

  const displayTime = previewTime >= 0 ? previewTime : time;

  return (
    <div style={{
      display: 'flex',
      marginBottom: '10px'
    }}>
      <h3 style={{
        margin: 0,
        minWidth: '175px',
        height: '35px',
        backgroundColor: 'lightBlue'
      }}>
        {`Timeline (${displayTime >= 0 ? displayTime : '-'})`}
      </h3>
      {renderTimeSlices()}
    </div>
  );
};

export default Timeline;
