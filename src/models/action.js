import generateId from '../utils/generateId';
import * as config from '../config';

export const placeholderActionType = 'null';

export const createAction = (key) => {
  const action = config.actions[key];

  return {
    id: generateId(),
    type: key,
    name: action.name,
    time: action.isContinuous ? 25 : action.time,
    isContinuous: !!action.isContinuous,
    food: action.food || 0,
    wood: action.wood || 0,
  };
};

export const createPlaceholderAction = parentActionId => ({
  id: generateId(),
  type: placeholderActionType,
  time: 10, // set by reducer,
  parentActionId,
})
