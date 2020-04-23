import { connect } from 'react-redux';

import { actions, selectors } from '../store';

import Timeline from './Timeline';

const mapStateToProps = state => {
  const actions = selectors.actions.all(state)
    .sort((a, b) => a.timeOffset - b.timeOffset);

  let currentFood = 200;
  let foodIncrement = 0;
  let timeOffset = 0;
  const actionEnds = [];

  const resources = {};

  while (actions.length > 0 || actionEnds.length > 0) {
    while (
      actions.length > 0 &&
      actions[0].timeOffset === timeOffset
    ) {
      const action = actions.shift();
      
      if (action.isContinuous) {
        foodIncrement += action.food;
        actionEnds.push({
          foodIncrement: -action.food,
          timeOffset: action.timeOffset + action.time,
        });
      }
      else {
        currentFood += action.food;
      }
    }

    actionEnds.sort((a, b) => a.timeOffset - b.timeOffset);

    while (
      actionEnds.length > 0 &&
      actionEnds[0].timeOffset === timeOffset
    ) {
      actionEnds.shift();
    }

    currentFood += foodIncrement;
    resources[timeOffset] = {
      food: Math.round(currentFood),
    };
    timeOffset++;
  }

  return {
    time: selectors.timeline.time(state),
    resources,
  };
};

const mapDispatchToProps = ({
  setTime: actions.timeline.setTime,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Timeline);
