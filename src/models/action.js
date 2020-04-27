import generateId from '../utils/generateId';
import * as config from '../config';

export const createAction = (key, forceId) => {
  const action = config.actions[key];

  return {
    id: forceId || generateId(),
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
