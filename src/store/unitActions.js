import { createSlice, createSelector } from '@reduxjs/toolkit';

import * as actions from './actions';

const slice = createSlice({
  name: 'unitActions',
  initialState: {
    actionsByUnit: {},
  },
  extraReducers: {
    [actions.internalActions.add]: (state, { payload: { unitId, action } }) => {
      if (state.actionsByUnit[unitId]) {
        state.actionsByUnit[unitId].push(action.id);
      }
      else {
        state.actionsByUnit[unitId] = [action.id];
      }
    },
    [actions.internalActions.remove]: (state, { payload: { unitId, actionId } }) => {
      state.actionsByUnit[unitId] = state.actionsByUnit[unitId].filter(id => id !== actionId);
    },
  },
});

export const {
  name: sliceName,
  reducer,
} = slice;

const selectUnitActionsState = state => state[slice.name];

export const selectors = {
  makeSelectActionIdsForUnit: () => createSelector(
    selectUnitActionsState,
    (_, unitId) => unitId,
    (state, unitId) => state.actionsByUnit[unitId] || [],
  ),
};
