import { config } from '../../config';
import axios from 'axios';
import atob from 'atob';

let pagesData = {};

const getDataPages = async (type, id, forceLoad) => {
  if (pagesData[type] && pagesData[type][id] && !forceLoad) {
    return pagesData[type][id];
  }

  const baseUrl = config.reshetapi.DATA_PAGES_URLS[type];

  const data = await getPage(baseUrl, id, 1);
  const { pages = 1 } = data;
  const lastPage = Math.min(pages, config.reshetapi.MAX_CHANNEL_PAGES);
  if (lastPage > 1) {
    const pagesData = await Promise.all(
      Array.apply(null, Array(lastPage)).map((v, i) => {
        return getPage(baseUrl, id, i + 2);
      })
    );

    pagesData.forEach(pageData => {
      const { items: pageItems = [] } = pageData;
      data.items = [...data.items, ...pageItems];
    });
  }

  data.entry = data.items || data.entry || [];
  if (!pagesData[type]) {
    pagesData[type] = {};
  }
  pagesData[type][id] = data;
  return data;
};

function getPage(baseUrl, id, pageId) {
  return axios
    .get(`${baseUrl}${id}/${pageId}`)
    .then(response => {
      const str = atob(response.data);
      return JSON.parse(str);
    })
    .catch(err => {
      return {};
    });
}

module.exports = { getDataPages };
