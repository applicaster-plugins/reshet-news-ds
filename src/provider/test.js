import { config } from '../config/';

const { name } = config.provider;

export const test = {
  testCommand: `${name}://fetchData?type=test`
};
