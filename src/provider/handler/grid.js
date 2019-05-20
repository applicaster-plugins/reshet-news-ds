import api from '../../api';
import { mapItem } from '../../mappers/mapItem';
import { mapRootItem } from '../../mappers/mapRootItem';
import { createFeedItem } from '../../utils';

export const grid = async params => {
  const { id, section = 0 } = params;
  const result = await api.getGrid(id);
  let data = { ...result };
  let items = data.entry.filter(entry => entry.title && entry.id);
  let mapFunc = mapRootItem;
  if (section > 0) {
    const rootItem = items[parseInt(section) - 1];
    items = rootItem.entry;
    mapFunc = mapItem;
    data = { tagData: rootItem, title: rootItem.title };
  } else {
    const imageItem = { ...data.tagData };
    items.splice(0, 0, imageItem);
    delete data.tagData;
  }
  const entry = items.map(mapFunc).map(item => {
    if (section == 0) {
      const innerLink = encodeURIComponent(
        `reshetnewsds://fetchData?type=channel&id=${item.id}`
      );
      if (!item.link) {
        item.link = {};
      }
      item.link.href = innerLink;
      item.extensions.header_action_url = `news13://presentlayout?screenname=channel&dstype=atom_feed&dsurl=${innerLink}`;
    }
    return item;
  });
  return createFeedItem(data, entry);
};
