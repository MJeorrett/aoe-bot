import generateId from '../utils/generateId';
import * as config from '../config';

export const createUnit = (key, parentActionId) => {
  const unit = config.units[key];

  return {
    id: generateId(),
    key: key,
    name: unit.name,
    parentActionId,
  };
};