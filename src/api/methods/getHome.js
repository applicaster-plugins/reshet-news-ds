import { get } from './get';

const getHome = (index, forceLoad, limits) => {
  return get(1, index, forceLoad, limits);
};

module.exports = { getHome };
