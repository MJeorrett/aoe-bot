import { configureStore } from '@reduxjs/toolkit';

import * as unitsSlice from './units';
import * as actionsSlice from './actions';

const store = configureStore({
  reducer: {
    units: unitsSlice.reducer,
    actions: actionsSlice.reducer,
  },
});

export const actions = {
  units: unitsSlice.actions,
  actions: actionsSlice.actions,
};

export const selectors = {
  units: unitsSlice.selectors,
  actions: actionsSlice.selectors,
};

export default store;
