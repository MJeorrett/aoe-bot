import generateId from '../utils/generateId';

export const createAction = (key) => ({
  id: generateId(),
  type: key,
});
