import { clearReshetData } from './get';
import { clearPagesData } from './getDataPages';

export function clearCache() {
  clearReshetData();
  clearPagesData();
}
