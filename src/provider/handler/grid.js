import api from '../../api';
import { mapItem } from '../../mappers/mapItem';
import { mapRootItem } from '../../mappers/mapRootItem';
import { createFeedItem, getItemUrls } from '../../utils';

export const grid = async params => {
  const { id, section = -1 } = params;
  const result = await api.getGrid(id);
  let data = { ...result };
  let items = data.entry.filter(
    entry => entry.title && (entry.id || section > -1)
  );
  let mapFunc = mapRootItem;

  const imageItem = { ...data.tagData, entry: [] };
  items.splice(0, 0, imageItem);
  delete data.tagData;

  if (section > -1) {
    const rootItem = items[parseInt(section)];
    items = rootItem.entry;
    mapFunc = mapItem;
    data = { tagData: rootItem, title: rootItem.title };
  }

  const entry = items.map(mapFunc).map(item => {
    if (section == -1) {
      const { header_action_url, link } = getItemUrls(item.id);
      if (!item.link) {
        item.link = {};
      }
      item.link.href = link;
      item.extensions.header_action_url = header_action_url;
    }
    return item;
  });
  return createFeedItem(data, entry);
};
