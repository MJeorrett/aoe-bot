import { configureStore, createSelector } from '@reduxjs/toolkit';

import * as unitsSlice from './units';
import * as actionsSlice from './actions';
import * as actionTimingsSlice from './actionTimings';
import * as unitActionsSlice from './unitActions';
import * as timelineSlice from './timeline';

import selectResourcesByTime from './selectResourcesByTime';

const store = configureStore({
  reducer: {
    [unitsSlice.sliceName]: unitsSlice.reducer,
    [actionsSlice.sliceName]: actionsSlice.reducer,
    [actionTimingsSlice.sliceName]: actionTimingsSlice.reducer,
    [unitActionsSlice.sliceName]: unitActionsSlice.reducer,
    [timelineSlice.sliceName]: timelineSlice.reducer,
  },
});

export const actions = {
  units: unitsSlice.actions,
  actions: {
    ...actionsSlice.actions,
    ...actionTimingsSlice.actions,
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
