import { createSlice, createSelector } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'actions',
  initialState: {
    ids: [],
    items: {},
    actionTimeOffsets: {},
    unitActions: {},
  },
  reducers: {
    add: (state, { payload: { unitId, action } }) => {
      state.ids.push(action.id);
      state.items[action.id] = action;

      if (state.unitActions[unitId]) {
        const unitActions = state.unitActions[unitId];
        const previousActionId = unitActions[unitActions.length - 1];
        const previousAction = state.items[previousActionId];
        state.actionTimeOffsets[action.id] = state.actionTimeOffsets[previousActionId] + previousAction.time;
        state.unitActions[unitId].push(action.id);
      }
      else {
        state.actionTimeOffsets[action.id] = 0;
        state.unitActions[unitId] = [action.id];
      }
    },
    setTime: (state, { payload: { id, newTime } }) => {
      state.items[id].time = newTime;
    }
  },
});

export const {
  name: sliceName,
  reducer,
} = slice;

export const actions = {
  add: (unitId, action) => slice.actions.add({ unitId, action }),
  setTime: (id, newTime) => slice.actions.setTime({ id, newTime }),
};

const selectActionsState = state => state[slice.name];

export const selectors = {
  makeSelectActionsForUnit: () => createSelector(
    selectActionsState,
    (_, unitId) => unitId,
    (state, unitId) => {
      const actionIds = state.unitActions[unitId] || [];
      return actionIds.map(actionId => ({
        ...state.items[actionId],
        timeOffset: state.actionTimeOffsets[actionId],
      }));
    },
  ),
  all: createSelector(
    selectActionsState,
    state => {
      const result = [];
      Object.keys(state.unitActions).forEach(unitId => (
        state.unitActions[unitId].map(actionId => ({
          ...state.items[actionId],
          timeOffset: state.actionTimeOffsets[actionId],
        }))
      ));
      return result;
    },
  ),
  makeSelectTimeById: () => createSelector(
    selectActionsState,
    (_, id) => id,
    (state, id) => state.items[id].time,
  ),
};
