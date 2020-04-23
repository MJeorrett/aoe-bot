import { configureStore } from '@reduxjs/toolkit';

import * as unitsSlice from './units';
import * as actionsSlice from './actions';
import * as timelineSlice from './timeline';

const store = configureStore({
  reducer: {
    units: unitsSlice.reducer,
    actions: actionsSlice.reducer,
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
  actions: actionsSlice.selectors,
  timeline: timelineSlice.selectors,
};

export default store;
