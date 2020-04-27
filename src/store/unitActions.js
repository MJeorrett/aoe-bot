import { createSlice, createSelector } from '@reduxjs/toolkit';

import * as unitsSlice from './units';
import * as actionsSlice from './actions';

const slice = createSlice({
  name: 'unitActions',
  initialState: {
    actionsByUnit: {},
    actionParentUnits: {},
  },
  extraReducers: {
    [unitsSlice.internalActions.remove]: (state, { payload: { unitId } }) => {
      delete state.actionsByUnit[unitId];
    },
    [actionsSlice.internalActions.add]: (state, { payload: { unitId, action } }) => {
      state.actionParentUnits[action.id] = unitId;

      if (state.actionsByUnit[unitId]) {
        state.actionsByUnit[unitId].push(action.id);
      }
      else {
        state.actionsByUnit[unitId] = [action.id];
      }
    },
    [actionsSlice.internalActions.remove]: (state, { payload: { actionId } }) => {
      const parentUnitId = state.actionParentUnits[actionId];

      state.actionsByUnit[parentUnitId] = state.actionsByUnit[parentUnitId].filter(id => id !== actionId);
      delete state.actionParentUnits[actionId];
    },
  },
});

export const {
  name: sliceName,
  reducer,
} = slice;

const selectUnitActionsState = state => state[slice.name];

const makeSelectActionIdsForUnit = () => createSelector(
  selectUnitActionsState,
  (_, unitId) => unitId,
  (state, unitId) => state.actionsByUnit[unitId] || [],
);

export const selectors = {
  makeSelectActionIdsForUnit,
  actionIdsForUnit: makeSelectActionIdsForUnit(),
};
