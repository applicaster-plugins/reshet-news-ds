import { config } from '../../config';
import axios from 'axios';
import atob from 'atob';

let reshetData = {};

const get = async (feedType, index, forceLoad, limits = []) => {
  return new Promise(async (resolve, reject) => {
    const stagingPrefix = config.isStaging ? 'staging-' : '';
    const urls = [
      `https://${stagingPrefix}news-api.reshet.tv/shows/1/`,
      `https://${stagingPrefix}news-api.reshet.tv/home/1/`,
      `https://${stagingPrefix}news-api.reshet.tv/grid/10/`
    ];

    if (!reshetData[feedType] || forceLoad) {
      const response = await axios.get(urls[feedType]);
      if (!response.data) {
        return reject('no reshet data');
      }
      let str = atob(response.data);
      let obj = JSON.parse(str);
      reshetData[feedType] = obj;
    }

    if (index === '-1') {
      const arr = reshetData[feedType].entry.reduce((sum, item, index) => {
        let { entry = [] } = item;
        if (limits && limits[index] && !isNaN(parseInt(limits[index]))) {
          entry = entry.slice(0, parseInt(limits[index]));
        }
        sum = [...sum, ...entry];
        return sum;
      }, []);
      resolve({ entry: arr });
    } else {
      resolve(reshetData[feedType].entry[index]);
    }
  });
};

const clearReshetData = () => {
  reshetData = {};
};

module.exports = { get, clearReshetData };
