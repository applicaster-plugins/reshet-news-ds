import { config } from '../../config';
import axios from 'axios';
import atob from 'atob';

let channelsData = [];

const getChannel = async (channelId, forceLoad) => {
  if (channelsData[channelId] && !forceLoad) {
    return channelsData[channelId];
  }

  const data = await getChannelPage(channelId, 1);
  const { pages = 1 } = data;
  const lastPage = Math.min(pages, config.reshetapi.MAX_CHANNEL_PAGES);
  if (lastPage > 1) {
    const pagesData = await Promise.all(
      Array.apply(null, Array(lastPage)).map((v, i) => {
        return getChannelPage(channelId, i + 2);
      })
    );

    pagesData.forEach(pageData => {
      const { items: pageItems = [] } = pageData;
      data.items = [...data.items, ...pageItems];
    });
  }
  data.entry = data.items || [];
  channelsData[channelId] = data;
  return data;
};

function getChannelPage(channelId, pageId) {
  return axios
    .get(`${config.reshetapi.CHANNEL_API_URL}${channelId}/${pageId}`)
    .then(response => {
      response.data
      let str = atob(response.data);            
      return JSON.parse(str);
    }).catch(err => {return {}});    
}

module.exports = { getChannel };
