import { createSlice, createSelector } from '@reduxjs/toolkit';

import * as actionsSlice from './actions';

const updateChildActionTimes = (state, parentActionId, deltaTime) => {
  const actionIdsToUpdate = state.children[parentActionId];

  if (!actionIdsToUpdate) return;

  actionIdsToUpdate.forEach(actionIdToUpdate => {
    const actionToUpdateIsPlaceholder = state.actionTypes[actionIdToUpdate] === 'null';

    if (actionToUpdateIsPlaceholder) {
      state.durations[actionIdToUpdate] += deltaTime;
    }
    else {
      state.actionTimeOffsets[actionIdToUpdate] += deltaTime;
    }

    updateChildActionTimes(state, actionIdToUpdate, deltaTime);
  });
};

const slice = createSlice({
  name: 'actionTimings',
  initialState: {
    actionIds: [],
    actionTypes: {},
    children: {},
    actionTimeOffsets: {},
    durations: {},
  },
  reducers: {
    setTime: (state, { payload: { actionId, newTime } }) => {
      const deltaTime = newTime - state.durations[actionId];
      state.durations[actionId] = newTime;
      updateChildActionTimes(state, actionId, deltaTime);
    },
  },
  extraReducers: {
    [actionsSlice.internalActions.add]: (state, { payload: { prevActionId, action } }) => {
      state.actionIds.push(action.id);
      state.actionTypes[action.id] = action.type;

      if (prevActionId) {
        if (!state.children[prevActionId]) state.children[prevActionId] = [];
        state.children[prevActionId].push(action.id);
      }

      if (action.type === 'null') {
        state.actionTimeOffsets[action.id] = 0;
        state.durations[action.id] = state.actionTimeOffsets[prevActionId] + state.durations[prevActionId];
      }
      else {
        state.actionTimeOffsets[action.id] = prevActionId ?
          state.actionTimeOffsets[prevActionId] + state.durations[prevActionId] :
          0;

        state.durations[action.id] = action.time;
      }
    },
    [actionsSlice.internalActions.remove]: (state, { payload: { actionId } }) => {
      updateChildActionTimes(state, actionId, -state.durations[actionId]);
      state.actionIds = state.actionIds.filter(id => id !== actionId);
      delete state.children[actionId];
      delete state.actionTypes[actionId];
      delete state.actionTimeOffsets[actionId];
      delete state.durations[actionId];
    },
  },
});

export const actions = {
  setTime: (actionId, newTime) => slice.actions.setTime({ actionId, newTime }),
};

export const {
  name: sliceName,
  reducer,
} = slice;

const selectActionTimingsState = state => state[slice.name];

const selectOffsetAndDuration = (state, actionId) => ({
  id: actionId,
  time: state.durations[actionId],
  timeOffset: state.actionTimeOffsets[actionId],
});

export const selectors = {
  all: createSelector(
    selectActionTimingsState,
    state => state.actionIds.map(id => selectOffsetAndDuration(state, id)),
  ),
  makeSelectOffsetAndDurationForAction: () => createSelector(
    selectActionTimingsState,
    (_, actionId) => actionId,
    selectOffsetAndDuration,
  ),
};
