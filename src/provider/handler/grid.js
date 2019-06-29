import api from '../../api';
import { mapItem } from '../../mappers/mapItem';
import { mapRootItem } from '../../mappers/mapRootItem';
import { createFeedItem, getItemUrls } from '../../utils';

export const grid = async params => {
  const { id, section = -1 } = params;
  const result = await api.getGrid(id);
  let data = { ...result };
  let items = data.entry.filter(entry => entry.entry && entry.entry.length > 0);
  let mapFunc = mapRootItem;

  const imageEntry = { ...data.tagData };
  const imageItem = { entry: [imageEntry] };
  items.splice(0, 0, imageItem);
  delete data.tagData;
  if (section > -1) {
    const itemType = section == 0 ? 'feed' : 'link';
    const rootItem = items[parseInt(section)];
    items = rootItem.entry;
    mapFunc = mapItem(itemType, section == 0, section == 0);
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

  return createFeedItem(data, entry, section > 0, false, section == 0);
};
