import { createSlice, createSelector } from '@reduxjs/toolkit';

import * as config from '../config';

const slice = createSlice({
  name: 'units',
  initialState: {
    ids: ['1', '2', '3', '4'],
    items: {
      '1': {
        id: '1',
        ...config.units[config.unitKeys.townCenter],
      },
      '2': {
        id: '2',
        ...config.units[config.unitKeys.villager],
      },
      '3': {
        id: '3',
        ...config.units[config.unitKeys.villager],
      },
      '4': {
        id: '4',
        ...config.units[config.unitKeys.villager],
      },
    },
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
  all: createSelector(
    selectUnitsState,
    state => state.ids.map(id => state.items[id]),
  ),
};
