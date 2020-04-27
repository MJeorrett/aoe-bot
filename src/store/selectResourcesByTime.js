import { createSelector } from '@reduxjs/toolkit';

import constants from '../constants';

import * as actionsSlice from './actions';
import * as timingSlice from './timing';

const selectResourcesByTime = createSelector(
  actionsSlice.selectors.all,
  timingSlice.selectors.all,
  (rawActions, actionTimings) => {
    const unsortedActions = rawActions.map(action => ({
      ...action,
      ...actionTimings.find(actionTiming => actionTiming.id === action.id),
    }));
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
        increments[type] += action[type];
        actionEnds.push({
          [type]: action[type],
          timeOffset: action.timeOffset + action.time,
        });
      }
    };

    const removeIncrementsForEndedAction = (actionEnd) => {
      if (actionEnd.food) increments.food -= actionEnd.food;
      if (actionEnd.wood) increments.wood -= actionEnd.wood;
      if (actionEnd.stone) increments.stone -= actionEnd.stone;
      if (actionEnd.gold) increments.gold -= actionEnd.gold;
    };

    const applyContinuousActionIncrements = () => {
      current.food += increments.food;
      current.wood += increments.wood;
      current.stone += increments.stone;
      current.gold += increments.gold;
    };

    const applyInstantActions = (actions) => {
      actions.forEach(action => {
        if (action.food) current.food += action.food;
        if (action.wood) current.wood += action.wood;
        if (action.stone) current.stone += action.stone;
        if (action.gold) current.gold += action.gold;
      });
    };

    const applyContinuousActions = (actions) => {
      actions.forEach(action => {
        updateResourceIncrement('food', action);
        updateResourceIncrement('wood', action);
        updateResourceIncrement('stone', action);
        updateResourceIncrement('gold', action);
      });

      actionEnds.sort((a, b) => a.timeOffset - b.timeOffset);
    };

    const removeFinishedContinuousActions = () => {
      while (
        actionEnds.length > 0 &&
        actionEnds[0].timeOffset === timeOffset
      ) {
        const actionEnd = actionEnds.shift();
        removeIncrementsForEndedAction(actionEnd);
      }
    };

    const getActionsForCurrentTime = () => {
      const actionsForCurrentTime = [];

      while (
        actions.length > 0 &&
        actions[0].timeOffset === timeOffset
      ) {
        actionsForCurrentTime.push(actions.shift());
      }

      return actionsForCurrentTime;
    }

    while (timeOffset <= constants.maxTime) {
      const actionsForCurrentTime = getActionsForCurrentTime();
      const continuousActions = [];
      const instantActions = [];

      actionsForCurrentTime.forEach(action => {
        if (action.isContinuous) continuousActions.push(action);
        else instantActions.push(action);
      })

      applyInstantActions(instantActions);

      resourcesByTime[timeOffset] = Object.assign({}, current);

      applyContinuousActions(continuousActions);

      removeFinishedContinuousActions();

      applyContinuousActionIncrements();

      timeOffset++;
    }

    return resourcesByTime;
  }
);

export default selectResourcesByTime;
