import { getDataPages } from './getDataPages';

const getGrid = async (id, forceLoad) => {
  return getDataPages('GRID', id, forceLoad);
};

module.exports = { getGrid };
