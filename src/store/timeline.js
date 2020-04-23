import { createSlice, createSelector } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'timeline',
  initialState: {
    time: null,
  },
  reducers: {
    setTime: (state, { payload: { newTime } }) => {
      state.time = newTime === state.time ? null : newTime;
    },
  },
});

export const {
  name: sliceName,
  reducer,
} = slice;

export const actions = {
  setTime: newTime => slice.actions.setTime({ newTime }),
};

const selectTimelineState = state => state[slice.name];

export const selectors = {
  time: createSelector(
    selectTimelineState,
    state => state.time,
  ),
};
