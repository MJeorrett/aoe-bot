import generateId from '../utils/generateId';
import * as config from '../config';

export const createAction = (key) => {
  const action = config.actions[key];

  return {
    id: generateId(),
    type: key,
    time: action.time,
  };
};
