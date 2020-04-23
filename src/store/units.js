import { createSlice, createSelector } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'units',
  initialState: {
    ids: [],
    items: {},
  },
  reducers: {
    'add': (state, { payload: { unit }}) => {
      state.ids.push(unit.id);
      state.items[unit.id] = unit;
    },
  }
});

export const {
  name: sliceName,
  reducer,
} = slice;

export const actions = {
  add: unit => slice.actions.add({ unit }),
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
