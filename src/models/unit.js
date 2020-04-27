import generateId from '../utils/generateId';
import * as config from '../config';

export const createUnit = (key, forceId) => {
  const unit = config.units[key];

  return {
    id: forceId || generateId(),
    key: key,
    name: unit.name,
  };
};