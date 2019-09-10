import { get } from './get';

const getVOD = (index, forceLoad, limits) => {
  return get(0, index, forceLoad, limits);
};

module.exports = { getVOD };
