import { createSlice, createSelector } from '@reduxjs/toolkit';

const updateActionTimeOffsetsForUnit = (state, unitId, startingIndex, deltaTime) => {
  const unitActionIds = state.unitActions[unitId];
  let actionToUpdateIndex = startingIndex;

  while (actionToUpdateIndex < unitActionIds.length) {
    const actionToUpdateId = unitActionIds[actionToUpdateIndex];
    state.actionTimeOffsets[actionToUpdateId] += deltaTime;
    actionToUpdateIndex++;
  }
};

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

      const unitActions = state.unitActions[unitId];
      if (unitActions && unitActions.length > 0) {
        const previousActionId = unitActions[unitActions.length - 1];
        const previousAction = state.items[previousActionId];
        state.actionTimeOffsets[action.id] = state.actionTimeOffsets[previousActionId] + previousAction.time;
        state.unitActions[unitId].push(action.id);
      }
      else {
        state.actionTimeOffsets[action.id] = 0;
        state.unitActions[unitId] = [action.id];
      }

      if (action.parentActionId) {
        const parentAction = state.items[action.parentActionId];
        state.items[action.id].time = state.actionTimeOffsets[parentAction.id] + parentAction.time;
      }
    },

    remove: (state, { payload: { actionId, unitId } }) => {
      const deltaTime = -state.items[actionId].time;
      const startingIndex = state.unitActions[unitId].indexOf(actionId) + 1;

      updateActionTimeOffsetsForUnit(state, unitId, startingIndex, deltaTime);

      state.ids = state.ids.filter(id => id !== actionId);
      delete state.items[actionId];
      delete state.actionTimeOffsets[actionId];
      state.unitActions[unitId] = state.unitActions[unitId].filter(id => id !== actionId);
    },
    setTime: (state, { payload: { id, unitId, newTime } }) => {
      const oldTime = state.items[id].time;
      const deltaTime = newTime - oldTime;
      state.items[id].time = newTime;

      const startingIndex = state.unitActions[unitId].indexOf(id) + 1;

      updateActionTimeOffsetsForUnit(state, unitId, startingIndex, deltaTime);
    },
  },
});

export const {
  name: sliceName,
  actions: internalActions,
  reducer,
} = slice;

export const actions = {
  add: (unitId, action) => slice.actions.add({ unitId, action }),
  remove: (actionId, unitId) => slice.actions.remove({ unitId, actionId }),
  setTime: (id, unitId, newTime) => slice.actions.setTime({ id, unitId, newTime }),
};

const selectActionsState = state => state[slice.name];

export const selectors = {
  makeSelectActionById: () => createSelector(
    selectActionsState,
    (_, actionId) => actionId,
    (state, actionId) => ({
      ...state.items[actionId],
      timeOffset: state.actionTimeOffsets[actionId],
    }),
  ),
  all: createSelector(
    selectActionsState,
    state => {
      const result = [];
      Object.keys(state.unitActions).forEach(unitId => (
        state.unitActions[unitId].forEach(actionId => {
          result.push({
            ...state.items[actionId],
            timeOffset: state.actionTimeOffsets[actionId],
          })
        })
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
