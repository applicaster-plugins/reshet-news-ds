import { getFeed } from './getFeed';

export const live = async params => {
  return getFeed(params, 'getLive');
};
