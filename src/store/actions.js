import { createSlice, createSelector } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'actions',
  initialState: {
    ids: [],
    items: {},
  },
  reducers: {
    add: (state, { payload: { unitId, action } }) => {
      state.ids.push(action.id);
      state.items[action.id] = action;
    },
    remove: (state, { payload: { actionId } }) => {
      state.ids = state.ids.filter(id => id !== actionId);
      delete state.items[actionId];
    },
  },
});

export const {
  name: sliceName,
  actions: internalActions,
  reducer,
} = slice;

export const actions = {
  // TODO: move prevActionId parameter to end as it is optional
  add: (unitId, prevActionId, action) => slice.actions.add({ unitId, prevActionId, action }),
  remove: (actionId) => slice.actions.remove({ actionId }),
};

const selectActionsState = state => state[slice.name];

export const selectors = {
  makeSelectActionById: () => createSelector(
    selectActionsState,
    (_, actionId) => actionId,
    (state, actionId) => state.items[actionId],
  ),
  all: createSelector(
    selectActionsState,
    state => state.ids.map(id => state.items[id]),
  ),
};
