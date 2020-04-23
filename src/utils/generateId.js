import { v4 as genUuid } from 'uuid';

const generateId = () => {
  return genUuid();
};

export default generateId;
