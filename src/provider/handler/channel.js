import { getFeed } from './getFeed';

export const channel = async params => {
  return getFeed(params, 'getChannel', true);
};
