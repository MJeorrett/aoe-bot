import { configureStore } from '@reduxjs/toolkit';

import * as units from './units';

const store = configureStore({
  reducer: {
    units: units.reducer,
  },
});

export const actions = {
  units: units.actions,
};

export const selectors = {
  units: units.selectors,
};

export default store;
