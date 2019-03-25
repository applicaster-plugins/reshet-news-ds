import { get } from './get';

const getVOD = (index, forceLoad) => {
  return get(0, index, forceLoad);
};

module.exports = { getVOD };
