import { createSlice, createSelector } from '@reduxjs/toolkit';

import * as actionsSlice from './actions';

const slice = createSlice({
  name: 'control',
  initialState: {
    selectedActionId: null,
  },
  reducers: {
    setSelectedAction: (state, { payload: { actionId } }) => {
      state.selectedActionId = actionId;
    }
  },
  extraReducers: {
    [actionsSlice.actions.remove]: (state, { payload: { actionId } }) => {
      if (state.selectedActionId === actionId) state.selectedActionId = null;
    },
  },
});

export const {
  name: sliceName,
  reducer,
} = slice;

export const actions = {
  setSelectedAction: actionId => slice.actions.setSelectedAction({ actionId }),
};

const selectControlState = state => state[slice.name];

export const selectors = {
  selectedActionId: createSelector(
    selectControlState,
    state => state.selectedActionId,
  ),
};
