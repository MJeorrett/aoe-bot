import { createSelector } from '@reduxjs/toolkit';

import constants from '../constants';

import * as actionsSlice from './actions';

const selectResourcesByTime = createSelector(
  actionsSlice.selectors.all,
  unsortedActions => {
    const actions = unsortedActions.sort((a, b) => a.timeOffset - b.timeOffset);
    let currentFood = 200;
    let foodIncrement = 0;
    let timeOffset = 0;
    const actionEnds = [];

    const resourcesByTime = {};

    while (timeOffset <= constants.maxTime) {
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
      resourcesByTime[timeOffset] = {
        food: Math.floor(currentFood),
      };

      timeOffset++;
    }

    return resourcesByTime;
  }
);

export default selectResourcesByTime;
