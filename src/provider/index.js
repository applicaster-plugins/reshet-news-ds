import { manifest } from './manifest';
import { handler } from './handler';
import { test } from './test';
import { config } from '../config/';

const { name } = config.provider;

const provider = {
  name,
  manifest,
  handler,
  test
};

export default provider;
