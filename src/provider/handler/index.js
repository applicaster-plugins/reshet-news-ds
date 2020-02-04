import { commands } from './comands';
import {
  mergeUrlParams,
  filterGeoBlockedVideos,
  getVideosData
} from '../../utils';

import { config } from '../../config';
import { clearCache as doClearCache } from '../../api';

export const handler = nativeBridge => params => {
  params = mergeUrlParams(params);
  const { type, isStaging, clearCache = false } = params;

  if (clearCache) {
    doClearCache();
  }

  if (isStaging === 'true') {
    config.isStaging = true;
    config.stagingStr = '&isStaging=true';
    config.reshetapi.getChannelUrl =
      'https://staging-news-api.reshet.tv/channel/';
    config.reshetapi.getSpecialShowUrl =
      'https://staging-news-api.reshet.tv/specialShow/';
  }

  return commands[type](params)
    .then(nativeBridge.sendResponse)
    .catch(nativeBridge.throwError);
};
