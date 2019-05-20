import { vod } from './vod';
import { home } from './home';
import { live } from './live';
import { channel } from './channel';
import { grid } from './grid';

const test = () => {
  return new Promise(resolve => resolve({}));
};

export const commands = {
  vod,
  home,
  live,
  channel,
  grid,
  test
};
