import { createSlice, createSelector } from '@reduxjs/toolkit';

import * as unitsSlice from './units';
import * as actionsSlice from './actions';

const slice = createSlice({
  name: 'control',
  initialState: {
    selectedUnitId: null,
    selectedActionId: null,
  },
  reducers: {
    setSelectedUnit: (state, { payload: { unitId } }) => {
      state.selectedActionId = null;
      state.selectedUnitId = unitId;
    },
    setSelectedAction: (state, { payload: { actionId } }) => {
      state.selectedUnitId = null;
      state.selectedActionId = actionId;
    }
  },
  extraReducers: {
    [unitsSlice.internalActions.remove]: (state, { payload: { unitId } }) => {
      if (state.selectedUnitId === unitId) state.selectedUnitId = null;
    },
    [actionsSlice.internalActions.remove]: (state, { payload: { actionId } }) => {
      if (state.selectedActionId === actionId) state.selectedActionId = null;
    },
  },
});

export const {
  name: sliceName,
  reducer,
} = slice;

export const actions = {
  setSelectedUnit: unitId => slice.actions.setSelectedUnit({ unitId }),
  setSelectedAction: actionId => slice.actions.setSelectedAction({ actionId }),
};

const selectControlState = state => state[slice.name];

export const selectors = {
  selectedUnitId: createSelector(
    selectControlState,
    state => state.selectedUnitId,
  ),
  selectedActionId: createSelector(
    selectControlState,
    state => state.selectedActionId,
  ),
};
