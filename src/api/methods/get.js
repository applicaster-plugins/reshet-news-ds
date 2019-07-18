import { config } from '../../config';
import axios from 'axios';
import atob from 'atob';

let reshetData = {};

const get = (feedType, index, forceLoad) => {
  return new Promise((resolve, reject) => {
    const stagingPrefix = config.isStaging ? 'staging-' : '';
    const urls = [
      `https://${stagingPrefix}news-api.reshet.tv/shows/1/`,
      `https://${stagingPrefix}news-api.reshet.tv/home/1/`,
      `https://${stagingPrefix}news-api.reshet.tv/grid/10/`
    ];

    if (!reshetData[feedType] || forceLoad) {
      axios.get(urls[feedType]).then(response => {
        if (!response.data) {
          return reject('no reshet data');
        }
        let str = atob(response.data);
        let obj = JSON.parse(str);
        reshetData[feedType] = obj;
        resolve(obj.entry[index]);
      });
    } else {
      resolve(reshetData[feedType].entry[index]);
    }
  });
};

const clearReshetData = () => {
  reshetData = {};
};

module.exports = { get, clearReshetData };
