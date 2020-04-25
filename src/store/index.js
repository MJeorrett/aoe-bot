import { configureStore } from '@reduxjs/toolkit';

import * as unitsSlice from './units';
import * as actionsSlice from './actions';
import * as unitActionsSlice from './unitActions';
import * as timelineSlice from './timeline';

import selectResourcesByTime from './selectResourcesByTime';

const store = configureStore({
  reducer: {
    units: unitsSlice.reducer,
    actions: actionsSlice.reducer,
    unitActions: unitActionsSlice.reducer,
    timeline: timelineSlice.reducer,
  },
});

export const actions = {
  units: unitsSlice.actions,
  actions: actionsSlice.actions,
  timeline: timelineSlice.actions,
};

export const selectors = {
  units: unitsSlice.selectors,
  actions: {
    ...actionsSlice.selectors,
    ...unitActionsSlice.selectors,
  },
  timeline: timelineSlice.selectors,
  meta: {
    resourcesByTime: selectResourcesByTime,
  },
};

export default store;
