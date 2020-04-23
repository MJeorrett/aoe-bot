import { createSelector } from '@reduxjs/toolkit';

import constants from '../constants';

import * as actionsSlice from './actions';

const selectResourcesByTime = createSelector(
  actionsSlice.selectors.all,
  unsortedActions => {
    const actions = unsortedActions.sort((a, b) => a.timeOffset - b.timeOffset);
    // TODO: Put starting values in constants.
    let currentFood = 200;
    let currentWood = 200;
    let foodIncrement = 0;
    let woodIncrement = 0;
    let timeOffset = 0;
    const actionEnds = [];

    const resourcesByTime = {};

    while (timeOffset <= constants.maxTime) {
      while (
        actions.length > 0 &&
        actions[0].timeOffset === timeOffset
      ) {
        const action = actions.shift();

        if (action.food) {
          if (action.isContinuous) {
            foodIncrement += action.food;
            actionEnds.push({
              foodIncrement: action.food,
              timeOffset: action.timeOffset + action.time,
            });
          }
          else {
            currentFood += action.food;
          }
        }
        if (action.wood) {
          if (action.isContinuous) {
            woodIncrement += action.wood;
            actionEnds.push({
              woodIncrement: action.wood,
              timeOffset: action.timeOffset + action.time,
            });
          }
          else {
            currentWood += action.wood;
          }
        }
      }

      actionEnds.sort((a, b) => a.timeOffset - b.timeOffset);

      while (
        actionEnds.length > 0 &&
        actionEnds[0].timeOffset === timeOffset
      ) {
        const actionEnd = actionEnds.shift();
        foodIncrement -= actionEnd.foodIncrement;
        woodIncrement -= actionEnd.woodIncrement;
      }

      currentFood += foodIncrement;
      currentWood += woodIncrement;

      resourcesByTime[timeOffset] = {
        food: Math.floor(currentFood),
        wood: Math.floor(currentWood),
      };

      timeOffset++;
    }

    return resourcesByTime;
  }
);

export default selectResourcesByTime;
