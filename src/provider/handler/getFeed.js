import api from '../../api';
import { mapItem } from '../../mappers/mapItem';
import { createFeedItem } from '../../utils';

export const getFeed = async (
  params,
  apiFunctionName,
  firstItemAsRoot = false
) => {
  const { id, limits: _limits = '' } = params;
  const limits = _limits.split(',');
  const data = await api[apiFunctionName](id, false, limits);
  const entry = data.entry.map(mapItem());
  return createFeedItem(data, entry, false, firstItemAsRoot);
};
