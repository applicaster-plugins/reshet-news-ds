import api from '../../api';
import { mapItem } from '../../mappers/mapItem';
import { createFeedItem } from '../../utils';

export const getFeed = async (params, apiFunctionName) => {
  const { id } = params;
  const data = await api[apiFunctionName](id);
  const entry = data.entry.map(mapItem);
  return createFeedItem(data, entry);
};
