import { vod } from './vod';
import { home } from './home';
import { live } from './live';
import { channel } from './channel';
import { grid } from './grid';
import { channelWrapper } from './channelWrapper';

const test = () => {
  return new Promise(resolve => resolve({}));
};

export const commands = {
  vod,
  home,
  live,
  channel,
  grid,
  channelWrapper,
  test
};
