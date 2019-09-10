import { get } from './get';

const getLive = (index, forceLoad, limits) => {
  return get(2, index, forceLoad, limits);
};

module.exports = { getLive };
