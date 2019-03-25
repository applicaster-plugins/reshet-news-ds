import { get } from './get';

const getLive = (index, forceLoad) => {
  return get(2, index, forceLoad);
};

module.exports = { getLive };
