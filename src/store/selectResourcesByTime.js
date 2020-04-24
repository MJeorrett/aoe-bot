import { createSelector } from '@reduxjs/toolkit';

import constants from '../constants';

import * as actionsSlice from './actions';

const selectResourcesByTime = createSelector(
  actionsSlice.selectors.all,
  unsortedActions => {
    const actions = unsortedActions.sort((a, b) => a.timeOffset - b.timeOffset);

    const current = {
      food: constants.startingFood,
      wood: constants.startingWood,
      stone: constants.startingStone,
      gold: constants.startingGold,
    };

    const increments = {
      food: 0,
      wood: 0,
      stone: 0,
      gold: 0,
    };
    
    let timeOffset = 0;
    const actionEnds = [];

    const resourcesByTime = {};

    const updateResourceIncrement = (type, action) => {
      if (action[type]) {
        if (action.isContinuous) {
          increments[type] += action[type];
          actionEnds.push({
            [type]: action[type],
            timeOffset: action.timeOffset + action.time,
          });
        }
        else {
          current[type] += action[type];
        }
      }
    };

    const removeIncrementsForEndedAction = (actionEnd) => {
      if (actionEnd.food) increments.food -= actionEnd.food;
      if (actionEnd.wood) increments.wood -= actionEnd.wood;
      if (actionEnd.stone) increments.stone -= actionEnd.stone;
      if (actionEnd.gold) increments.gold -= actionEnd.gold;
    };

    const applyResourceIncrements = () => {
      current.food += increments.food;
      current.wood += increments.wood;
      current.stone += increments.stone;
      current.gold += increments.gold;
    };

    const createCurrentResource = () => ({
      food: Math.floor(current.food),
      wood: Math.floor(current.wood),
      stone: Math.floor(current.stone),
      gold: Math.floor(current.gold),
    });

    const applyActionsAtCurrentTime = () => {
      while (
        actions.length > 0 &&
        actions[0].timeOffset === timeOffset
      ) {
        const action = actions.shift();
        updateResourceIncrement('food', action);
        updateResourceIncrement('wood', action);
        updateResourceIncrement('stone', action);
        updateResourceIncrement('gold', action);
      }

      actionEnds.sort((a, b) => a.timeOffset - b.timeOffset);
    };

    const removeEndedActions = () => {
      while (
        actionEnds.length > 0 &&
        actionEnds[0].timeOffset === timeOffset
      ) {
        const actionEnd = actionEnds.shift();
        removeIncrementsForEndedAction(actionEnd);
      }
    };

    while (timeOffset <= constants.maxTime) {
      applyActionsAtCurrentTime();

      removeEndedActions();

      applyResourceIncrements();

      resourcesByTime[timeOffset] = createCurrentResource();
      timeOffset++;
    }

    return resourcesByTime;
  }
);

export default selectResourcesByTime;
