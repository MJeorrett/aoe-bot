import { createSlice, createSelector } from '@reduxjs/toolkit';

import * as unitsSlice from './units';

const slice = createSlice({
  name: 'actionUnits',
  initialState: {
    childUnitByAction: {},
    parentActionByUnit: {},
  },
  extraReducers: {
    [unitsSlice.internalActions.add]: (state, { payload: { unit, parentActionId } }) => {
      state.childUnitByAction[parentActionId] = unit.id;
      state.parentActionByUnit[unit.id] = parentActionId;
    },
    [unitsSlice.internalActions.remove]: (state, { payload: { unitId } }) => {
      const parentActionId = state.parentActionByUnit[unitId];
      delete state.childUnitByAction[parentActionId];
      delete state.parentActionByUnit[unitId];
    },
  },
});

export const {
  name: sliceName,
  reducer,
} = slice;

const selectActionUnitsState = state => state[slice.name];

export const selectors = {
  childUnitByAction: createSelector(
    selectActionUnitsState,
    state => state.childUnitByAction,
  ),
  makeSelectParentActionForUnit: () => createSelector(
    selectActionUnitsState,
    (_, unitId) => unitId,
    (state, unitId) => state.parentActionByUnit[unitId],
  ),
};
