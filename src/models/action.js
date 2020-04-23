import generateId from '../utils/generateId';
import * as config from '../config';

export const createAction = (key) => {
  const action = config.actions[key];

  return {
    id: generateId(),
    type: key,
    name: action.name,
    time: action.isContinuous ? 25 : action.time,
    isContinuous: !!action.isContinuous,
    food: action.food || 0,
  };
};
