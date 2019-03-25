import { getFeed } from './getFeed';

export const home = async params => {
  return getFeed(params, 'getHome');
};
