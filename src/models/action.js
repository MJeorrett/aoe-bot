import generateId from '../utils/generateId';

export const createAction = (actionConfig, forceId) => {
  return {
    id: forceId || generateId(),
    typeId: actionConfig.typeId,
    name: actionConfig.name,
    time: actionConfig.isContinuous ? 25 : actionConfig.time,
    isContinuous: !!actionConfig.isContinuous,
    food: actionConfig.food || 0,
    wood: actionConfig.wood || 0,
    stone: actionConfig.stone || 0,
    gold: actionConfig.gold || 0,
  };
};
