import { configureStore, createSelector } from '@reduxjs/toolkit';

import * as unitsSlice from './units';
import * as actionsSlice from './actions';
import * as actionTimingsSlice from './actionTimings';
import * as unitActionsSlice from './unitActions';
import * as actionUnitsSlice from './actionUnits';
import * as timelineSlice from './timeline';

import selectResourcesByTime from './selectResourcesByTime';

const store = configureStore({
  reducer: {
    [unitsSlice.sliceName]: unitsSlice.reducer,
    [actionsSlice.sliceName]: actionsSlice.reducer,
    [actionTimingsSlice.sliceName]: actionTimingsSlice.reducer,
    [unitActionsSlice.sliceName]: unitActionsSlice.reducer,
    [actionUnitsSlice.sliceName]: actionUnitsSlice.reducer,
    [timelineSlice.sliceName]: timelineSlice.reducer,
  },
});

const removeActionAndChildUnits = (dispatch, state, childUnitByAction, actionId) => {
  if (childUnitByAction[actionId]) {
    const unitId = childUnitByAction[actionId];
    const unitActionIds = unitActionsSlice.selectors.actionIdsForUnit(state, unitId);
    unitActionIds.forEach(unitActionId => removeActionAndChildUnits(dispatch, state, childUnitByAction, unitActionId));

    dispatch(unitsSlice.actions.remove(unitId));
  }

  dispatch(actionsSlice.actions.remove(actionId));
};

export const actions = {
  units: unitsSlice.actions,
  actions: {
    ...actionsSlice.actions,
    ...actionTimingsSlice.actions,
    remove: (actionId, unitId) => (dispatch, getState) => {
      const state = getState();
      const childUnitByAction = actionUnitsSlice.selectors.childUnitByAction(state);
      removeActionAndChildUnits(dispatch, state, childUnitByAction, actionId);
    },
  },
  timeline: timelineSlice.actions,
};

export const selectors = {
  units: unitsSlice.selectors,
  actions: {
    all: createSelector(
      actionsSlice.selectors.all,
      actionTimingsSlice.selectors.all,
      (actions, actionTimings) => actions.map(action => ({
        ...action,
        ...actionTimings.find(actionTiming => actionTiming.id === action.id),
      })),
    ),
    makeSelectActionById: () => createSelector(
      actionsSlice.selectors.makeSelectActionById(),
      actionTimingsSlice.selectors.makeSelectOffsetAndDurationForAction(),
      (action, actionTiming) => ({
        ...action,
        ...actionTiming,
      }),
    ),
    ...unitActionsSlice.selectors,
  },
  timeline: timelineSlice.selectors,
  meta: {
    resourcesByTime: selectResourcesByTime,
  },
};

export default store;
