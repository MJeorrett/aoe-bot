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
      completedResearch: [],
    };

    const increments = {
      food: 0,
      wood: 0,
      stone: 0,
      gold: 0,
    };

    let currentTime = 0;
    const actionsInProgress = [];
    const resourcesByTime = {};

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
        ['food', 'wood', 'stone', 'gold'].forEach(type => {
          if (action[type]) {
            increments[type] += action[type];
          }
        });
        actionsInProgress.push({
          ...action,
          endTime: action.timeOffset + action.time,
        });
      });

      actionsInProgress.sort((a, b) => a.endTime - b.endTime);
    };

    const applyCompletedResearchActions = () => {
      actionsInProgress.forEach(actionInProgress => {
        if (actionInProgress.isResearch && actionInProgress.endTime === currentTime) {
          current.completedResearch.push(actionInProgress.key);
        }
      });
    };

    const removeFinishedContinuousActions = () => {
      while (
        actionsInProgress.length > 0 &&
        actionsInProgress[0].endTime === currentTime
      ) {
        const actionInProgress = actionsInProgress.shift();
        removeIncrementsForEndedAction(actionInProgress);
      }
    };

    const getActionsForCurrentTime = () => {
      const actionsForCurrentTime = [];

      while (
        actions.length > 0 &&
        actions[0].timeOffset === currentTime
      ) {
        actionsForCurrentTime.push(actions.shift());
      }

      return actionsForCurrentTime;
    }

    while (currentTime <= constants.maxTime) {
      const actionsForCurrentTime = getActionsForCurrentTime();
      const continuousActions = [];
      const instantActions = [];

      actionsForCurrentTime.forEach(action => {
        if (action.isContinuous || action.isResearch) continuousActions.push(action);
        else instantActions.push(action);
      });

      applyInstantActions(instantActions);

      applyCompletedResearchActions();

      resourcesByTime[currentTime] = JSON.parse(JSON.stringify(current));

      applyContinuousActions(continuousActions);

      removeFinishedContinuousActions();

      applyContinuousActionIncrements();

      currentTime++;
    }

    return resourcesByTime;
  }
);

export default selectResourcesByTime;
