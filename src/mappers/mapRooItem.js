export function mapRootItem(item) {
  try {
    const { ID: id, app_feed_image, image, title, url: header_action_url } =
      item || {};

    let media_item = [];
    if (image) {
      media_item.push({
        scale: 'large',
        src: image,
        key: 'feed'
      });

      media_item.push({
        scale: 'large',
        src: image,
        key: 'image_base'
      });

      media_item.push({
        scale: 'large',
        src: image,
        key: 'image_base_4x3'
      });
    }

    if (app_feed_image) {
      media_item.push({
        scale: 'large',
        src: app_feed_image,
        key: 'wide'
      });

      //add new key according to the cell stlye 1x1
      media_item.push({
        scale: 'large',
        src: app_feed_image,
        key: 'image_base_1x1'
      });
    }

    const media_group = [
      {
        type: 'image',
        media_item
      }
    ];

    const result = {
      type: {
        value: 'feed'
      },
      id,
      title,
      media_group,
      extensions: { header_action_url }
    };

    return result;
  } catch (err) {}
}