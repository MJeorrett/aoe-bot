import { createSlice, createSelector } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'timeline',
  initialState: {
    time: 0,
    previewTime: null,
  },
  reducers: {
    setTime: (state, { payload: { newTime } }) => {
      state.time = newTime === state.time ? -1 : newTime;
    },
    setPreviewTime: (state, { payload: { newPreviewTime } }) => {
      state.previewTime = newPreviewTime === state.previewTime ? -1 : newPreviewTime;
    },
  },
});

export const {
  name: sliceName,
  reducer,
} = slice;

export const actions = {
  setTime: newTime => slice.actions.setTime({ newTime }),
  setPreviewTime: newPreviewTime => slice.actions.setPreviewTime({ newPreviewTime }),
};

const selectTimelineState = state => state[slice.name];

export const selectors = {
  time: createSelector(
    selectTimelineState,
    state => state.time,
  ),
  previewTime: createSelector(
    selectTimelineState,
    state => state.previewTime,
  ),
};
