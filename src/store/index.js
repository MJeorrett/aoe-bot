import { configureStore, createSelector } from '@reduxjs/toolkit';

import * as controlSlice from './control';
import * as unitsSlice from './units';
import * as actionsSlice from './actions';
import * as timingSlice from './timing';
import * as unitActionsSlice from './unitActions';
import * as actionUnitsSlice from './actionUnits';
import * as timelineSlice from './timeline';

import selectResourcesByTime from './selectResourcesByTime';

const store = configureStore({
  reducer: {
    [controlSlice.sliceName]: controlSlice.reducer,
    [unitsSlice.sliceName]: unitsSlice.reducer,
    [actionsSlice.sliceName]: actionsSlice.reducer,
    [timingSlice.sliceName]: timingSlice.reducer,
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

const cascadeRemoveAction = (dispatch, state, actionId) => {
  const childUnitByAction = actionUnitsSlice.selectors.childUnitByAction(state);
  removeActionAndChildUnits(dispatch, state, childUnitByAction, actionId);
}

export const actions = {
  control: controlSlice.actions,
  units: {
    ...unitsSlice.actions,
    remove: unitId => (dispatch, getState) => {
      const state = getState();
      const childActionIds = unitActionsSlice.selectors.actionIdsForUnit(state, unitId);
      childActionIds.forEach(childActionId => {
        cascadeRemoveAction(dispatch, state, childActionId);
      });

      dispatch(unitsSlice.actions.remove(unitId));
    },
  },
  actions: {
    ...actionsSlice.actions,
    ...timingSlice.actions,
    // TODO: remove unitId parameter.
    remove: (actionId, unitId) => (dispatch, getState) => {
      cascadeRemoveAction(dispatch, getState(), actionId);
    },
  },
  timeline: timelineSlice.actions,
};

export const selectors = {
  control: controlSlice.selectors,
  units: {
    ...unitsSlice.selectors,
    makeSelectParentActionIdById: actionUnitsSlice.selectors.makeSelectParentActionForUnit,
  },
  actions: {
  // TODO: make consumers stitch timings and actions together themselves.
    all: createSelector(
      actionsSlice.selectors.all,
      timingSlice.selectors.all,
      (actions, actionTimings) => actions.map(action => ({
        ...action,
        ...actionTimings.find(actionTiming => actionTiming.id === action.id),
      })),
    ),
    makeSelectActionById: () => createSelector(
      actionsSlice.selectors.makeSelectActionById(),
      timingSlice.selectors.makeSelectOffsetAndDurationForAction(),
      (action, actionTiming) => ({
        ...action,
        ...actionTiming,
      }),
    ),
    ...unitActionsSlice.selectors,
  },
  timing: timingSlice.selectors,
  timeline: timelineSlice.selectors,
  meta: {
    resourcesByTime: selectResourcesByTime,
  },
};

export default store;
