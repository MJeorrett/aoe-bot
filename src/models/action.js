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
    stone: action.stone || 0,
    gold: action.gold || 0,
  };
};

export const createPlaceholderAction = () => ({
  id: generateId(),
  type: placeholderActionType,
  time: 1, // set by reducer,
});
