import { createSlice, createSelector } from '@reduxjs/toolkit';

import * as unitsSlice from './units';
import * as actionsSlice from './actions';

const updateChildOffsets = (state, parentId, deltaTime) => {
  const childIdsToUpdate = state.parentChildren[parentId];

  if (!childIdsToUpdate) return;

  childIdsToUpdate.forEach(childIdToUpdate => {
    state.items[childIdToUpdate].offset += deltaTime;
    updateChildOffsets(state, childIdToUpdate, deltaTime);
  });
};

const addChildToParent = (state, parentId, childId) => {
  if (!state.parentChildren[parentId]) state.parentChildren[parentId] = [];
  state.parentChildren[parentId].push(childId);
  state.childParent[childId] = parentId;
};

const removeActionFromParentChildTree = (state, actionId) => {
  const parentId = state.childParent[actionId];

  // remove from parent's children
  if (parentId) {
    state.parentChildren[parentId] = state.parentChildren[parentId].filter(id => id !== actionId);
  }

  // set action's children parents to the action's parent
  if (state.parentChildren[actionId]) {
    state.parentChildren[actionId].forEach(childId => {
      state.childParent[childId] = parentId;
      state.parentChildren[parentId].push(childId);
    });

    delete state.parentChildren[actionId];
  }

  delete state.childParent[actionId];
};

const slice = createSlice({
  name: 'timing',
  initialState: {
    actionIds: [],
    items: {},
    parentChildren: {},
    childParent: {},
  },
  reducers: {
    setDuration: (state, { payload : { itemId, newDuration } }) => {
      const item = state.items[itemId];
      const deltaTime = newDuration - item.duration;
      item.duration = newDuration;
      updateChildOffsets(state, itemId, deltaTime);
    },
  },
  extraReducers: {
    [unitsSlice.internalActions.add]: (state, { payload: { unit, parentActionId } }) => {
      const parentAction = state.items[parentActionId];

      state.items[unit.id] = {
        id: unit.id,
        type: 'unit',
        duration: 0,
        offset: parentAction ? parentAction.offset + parentAction.duration : 0,
      };

      if (parentActionId) {
        addChildToParent(state, parentActionId, unit.id);
      }
    },
    [unitsSlice.internalActions.remove]: (state, { payload: { unitId } }) => {
      delete state.items[unitId];
      removeActionFromParentChildTree(state, unitId);
    },
    [actionsSlice.internalActions.add]: (state, { payload: { unitId, action, prevActionId } }) => {
      state.actionIds.push(action.id);

      const timingParent = prevActionId ? state.items[prevActionId] : state.items[unitId];

      state.items[action.id] = {
        id: action.id,
        type: 'action',
        duration: action.time,
        offset: timingParent.offset + timingParent.duration,
      }

      addChildToParent(state, timingParent.id, action.id);
    },
    [actionsSlice.internalActions.remove]: (state, { payload: { actionId } }) => {
      const deltaTime = -state.items[actionId].duration;
      updateChildOffsets(state, actionId, deltaTime);
      
      state.actionIds = state.actionIds.filter(id => id !== actionId);
      delete state.items[actionId];
      removeActionFromParentChildTree(state, actionId);
    },
  },
});

export const {
  name: sliceName,
  reducer,
} = slice;

export const actions = {
  // TODO: move mapping od action to item into index.
  setTime: (actionId, newDuration) => slice.actions.setDuration({ itemId: actionId, newDuration }),
};

const selectTimingState = state => state[slice.name];

// TODO: make consumers use duration and offset
const selectOffsetAndDuration = (state, actionId) => ({
  id: actionId,
  time: state.items[actionId].duration,
  timeOffset: state.items[actionId].offset,
});

export const selectors = {
  all: createSelector(
    selectTimingState,
    state => state.actionIds.map(id => selectOffsetAndDuration(state, id)),
  ),
  // TODO: rename this to make select timing for item.
  makeSelectOffsetAndDurationForAction: () => createSelector(
    selectTimingState,
    (_, actionId) => actionId,
    selectOffsetAndDuration,
  ),
};