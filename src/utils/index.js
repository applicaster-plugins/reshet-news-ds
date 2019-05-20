import { config } from '../config';
import axios from 'axios';
import _url from 'url';
import { mapRootItem } from '../mappers/mapRootItem';

var wasInIsrael = null;

export const getVideoData = videoId => {
  const aUrl = `${config.brightcove.baseUrl}/accounts/${
    config.brightcove.accountId
  }/videos/ref:${videoId}`;
  const headers = {
    Accept: `application/json;pk=${config.brightcove.policyKey}`,
    Authorization: `BCOV-Policy ${config.brightcove.policyKey}`
  };

  return axios
    .get(aUrl, {
      headers
    })
    .then(result => {
      return result.data;
    })
    .catch(err => {
      return null;
    });
};

export const isVideoGeoBlocked = video => {
  if (
    video.extensions &&
    video.extensions.tags &&
    video.extensions.tags.length > 0
  ) {
    return video.extensions.tags.indexOf('geoblock') > -1;
  }

  return false;
};

export const filterGeoBlockedVideos = feed => {
  return isInIsrael()
    .then(result => {
      if (result) {
        return [];
      }

      return Promise.all(
        feed.entry.map(entry => {
          if (entry.type.value == 'video') {
            return isVideoGeoBlocked(entry);
          }
          return false;
        })
      );
    })
    .then(results => {
      return feed.entry.map((entry, index) => {
        if (results[index]) {
          entry.content.src = config.geoBlockVideoUrl;
        }
        return entry;
      });
    })
    .then(result => {
      return feed;
    });
};

function isInIsrael() {
  if (wasInIsrael || wasInIsrael === false) {
    return new Promise(resolve => {
      resolve(wasInIsrael);
    });
  }

  const aUrl = `${config.ipapi.baseUrl}json/?key=${config.ipapi.licenseKey}`;

  return axios
    .get(aUrl)
    .then(result => {
      if (!result.data || !result.data.country) {
        return true; //in case the service is not working properly assume we are in Israel
      }

      if (result.data.country.toLowerCase() !== 'israel') {
        return false;
      }

      return true;
    })
    .then(result => {
      wasInIsrael = result;
      return result;
    })
    .catch(err => {
      return true; //if error then assume we are in Israel so the user can watch videos
    });
}

export const getVideosData = feed => {
  return Promise.all(
    feed.entry.map(entry => {
      if (entry.type.value == 'video') {
        return getVideoData(entry.id);
      }
      return null;
    })
  )
    .then(results => {
      return feed.entry.map((entry, index) => {
        if (results[index]) {
          let src = '';
          try {
            src = getBestVideoSource(results[index].sources);
          } catch (err) {}
          entry.content = { src };
          entry.extensions.tags = results[index].tags;
        }
        return entry;
      });
    })
    .then(result => {
      return feed;
    });
};

function getBestVideoSource(sources) {
  return sources.reduce((currentSource, element) => {
    if (
      element.src &&
      element.codec &&
      element.codec.toLowerCase() === 'h264' &&
      element.container &&
      element.container.toLowerCase() === 'mp4'
    ) {
      if (currentSource) {
        if (currentSource.height < element.height) {
          return element;
        }
      } else {
        return element;
      }
    }
    return currentSource;
  }, null).src;
}

export function createMediaGroupItem(src, key) {
  return {
    type: 'image',
    media_item: [
      {
        src,
        key
      }
    ]
  };
}

export function createFeedItem(data, entry) {
  const feed = mapRootItem(data.tagData);
  feed.entry = entry;
  feed.title = data.title;
  return feed;
}

export function mergeUrlParams(params) {
  const { url = '' } = params;
  try {
    const aUrl = _url.parse(url, true);
    Object.entries(aUrl.query).forEach(arr => {
      if (!params[arr[0]]) {
        params[arr[0]] = arr[1];
      }
    });
  } catch (err) {
  } finally {
    return params;
  }
}

export function getItemUrls(id) {
  const link = encodeURIComponent(
    `reshetnewsds://fetchData?type=channel&id=${id}`
  );
  const header_action_url = `news13://presentlayout?screenname=channel&dstype=atom_feed&dsurl=${link}`;

  return {
    header_action_url,
    link
  };
}
