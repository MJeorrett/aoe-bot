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

const addTimeOffsetToActions = (state, actionIds) => {
  let timeOffset = 0;
  return actionIds.map(actionId => {
    const action = {
      timeOffset,
      ...state.items[actionId]
    };
    timeOffset += state.items[actionId].time;
    return action;
  });
}

export const selectors = {
  makeSelectActionsForUnit: () => createSelector(
    selectActionsState,
    (_, unitId) => unitId,
    (state, unitId) => {
      const actionIds = state.unitActions[unitId] || [];
      return addTimeOffsetToActions(state, actionIds);
    },
  ),
  all: createSelector(
    selectActionsState,
    state => {
      const result = [];
      Object.keys(state.unitActions).forEach(unitId => {
        addTimeOffsetToActions(state, state.unitActions[unitId])
          .forEach(action => result.push(action));
      });
      return result;
    },
  ),
  makeSelectTimeById: () => createSelector(
    selectActionsState,
    (_, id) => id,
    (state, id) => state.items[id].time,
  ),
};
