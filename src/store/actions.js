import { createSlice, createSelector } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'actions',
  initialState: {
    ids: [],
    items: {},
    unitActions: {},
  },
  reducers: {
    add: (state, { payload: { unitId, action } }) => {
      state.ids.push(action.id);
      state.items[action.id] = action;

      if (state.unitActions[unitId]) {
        state.unitActions[unitId].push(action.id);
      }
      else {
        state.unitActions[unitId] = [action.id];
      }
    },
  },
});

export const {
  name: sliceName,
  reducer,
} = slice;

export const actions = {
  add: (unitId, action) => slice.actions.add({ unitId, action }),
};

const selectActionsState = state => state[slice.name];

export const selectors = {
  makeSelectActionsForUnit: () => createSelector(
    selectActionsState,
    (_, unitId) => unitId,
    (state, unitId) => {
      const actionIds = state.unitActions[unitId] || [];
      let timeOffset = 1;
      return actionIds.map(actionId => {
        const action = {
          timeOffset,
          ...state.items[actionId]
        };
        timeOffset += state.items[actionId].time;
        return action;
      });
    },
  ),
};
