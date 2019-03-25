import { getFeed } from './getFeed';

export const vod = async params => {
  return getFeed(params, 'getVOD');
};
