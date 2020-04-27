import generateId from '../utils/generateId';
import { units } from '../config';

export const createAction = (actionKey, unitKey, forceId) => {
  const action = units[unitKey].actions[actionKey];

  if (!action) throw new Error(`No action with key ${actionKey} exists.`);

  return {
    id: forceId || generateId(),
    type: actionKey,
    name: action.name,
    time: action.isContinuous ? 25 : action.time,
    isContinuous: !!action.isContinuous,
    food: action.food || 0,
    wood: action.wood || 0,
    stone: action.stone || 0,
    gold: action.gold || 0,
  };
};
