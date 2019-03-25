import { commands } from './comands';
import {
  mergeUrlParams,
  filterGeoBlockedVideos,
  getVideosData
} from '../../utils';

import { config } from '../../config';

export const handler = nativeBridge => params => {
  const { type, isStaging } = params;

  params = mergeUrlParams(params);

  if (isStaging === 'true') {
    config.isStaging = true;
    config.stagingStr = '&isStaging=true';
    config.reshetapi.getChannelUrl =
      'https://staging-news-api.reshet.tv/channel/';
    config.reshetapi.getSpecialShowUrl =
      'https://staging-news-api.reshet.tv/specialShow/';
  }

  return commands[type](params)
    .then(getVideosData)
    .then(filterGeoBlockedVideos)
    .then(nativeBridge.sendResponse)
    .catch(nativeBridge.throwError);
};
