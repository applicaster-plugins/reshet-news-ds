import { getDataPages } from './getDataPages';

const getChannel = async (channelId, forceLoad) => {
  return getDataPages('CHANNEL', channelId, forceLoad);
};

module.exports = { getChannel };
