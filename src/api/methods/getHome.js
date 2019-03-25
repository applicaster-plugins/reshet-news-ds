import { get } from './get';

const getHome = (index, forceLoad) => {
  return get(1, index, forceLoad);
};

module.exports = { getHome };
