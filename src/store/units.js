import { createSlice, createSelector } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'units',
  initialState: {
    ids: [],
    items: {},
  },
  reducers: {
    add: (state, { payload: { unit }}) => {
      state.ids.push(unit.id);
      state.items[unit.id] = unit;
    },
    remove: (state, { payload: { unitId } }) => {
      state.ids = state.ids.filter(id => id !== unitId);
      delete state.items[unitId];
    },
  }
});

export const {
  name: sliceName,
  reducer,
  actions: internalActions,
} = slice;

export const actions = {
  add: (unit, parentActionId) => slice.actions.add({ unit, parentActionId }),
  remove: unitId => slice.actions.remove({ unitId }),
};

const selectUnitsState = state => state[slice.name];

export const selectors = {
  allIds: createSelector(
    selectUnitsState,
    state => state.ids,
  ),
  makeSelectById: () => createSelector(
    selectUnitsState,
    (_, id) => id,
    (state, id) => state.items[id],
  ),
};
