import { addShareParamsToLink } from '../utils/';
import moment from 'moment';

export function mapItem(
  itemType = 'link',
  removeExtensions = false,
  addEmptyContentSrc = false
) {
  return function(item) {
    let result = {
      type: {
        value: itemType
      },
      media_group: [],
      extensions: {}
    };

    try {
      result.id = item.post_ID;
      result.title = item.app_title;
      if (item.link) {
        result.extensions.share_link = item.link;
      }

      let mediaItems = [];
      if (item.images) {
        if (item.images.app_1x1) {
          mediaItems.push({
            scale: 'large',
            src: item.images.app_1x1,
            key: 'feed'
          });
          //add new key according to the cell stlye 1x1
          mediaItems.push({
            scale: 'large',
            src: item.images.app_1x1,
            key: 'image_base_1x1'
          });
        }

        if (item.images.app_16x9) {
          mediaItems.push({
            scale: 'large',
            src: item.images.app_16x9,
            key: 'wide'
          });
          //add new key according to the cell stlye 16x9
          mediaItems.push({
            scale: 'large',
            src: item.images.app_16x9,
            key: 'image_base_16x9'
          });
          //add image_base key - the default key
          mediaItems.push({
            scale: 'large',
            src: item.images.app_16x9,
            key: 'image_base'
          });
        }
      }

      result.media_group.push({
        type: 'image',
        media_item: mediaItems
      });

      if (addEmptyContentSrc) {
        result.content = { src: '' };
      }

      if (removeExtensions) {
        delete result.extensions;
        return result;
      }

      result.extensions.endorsement = item.endorsement;
      result.extensions.imageCredit = item.imageCredit;
      result.extensions.analytics_extra_params = {
        user_alternative_id: null,
        device_id: null,
        page_id: result.id.toString(),
        Page_1_level_heb: null,
        Page_2_level_heb: null,
        Page_3_level_heb: null,
        Page_4_level_heb: null,
        Page_5_level_heb: null,
        Page_6_level_heb: null,
        Page_PublishDate: null,
        page_Tags: null,
        page_category: null,
        page_title: result.title,
        page_type: null,
        page_url: null,
        page_writer: null,
        referenceId: null
      };

      if (
        item.video &&
        item.video.src &&
        item.link &&
        item.link.toLowerCase().indexOf('episode') > -1
      ) {
        result.type.value = 'video';
        if (item.video.referenceId) {
          result.id = item.video.referenceId;
        }
      } else {
        const href = addShareParamsToLink(item.link);
        result.link = {
          type: 'atom',
          rel: 'alternate',
          href
        };

        if (item.itemType && item.itemType == 'channel') {
          let innerLink = encodeURIComponent(
            `reshetnewsds://fetchData?type=channel&id=${result.id}`
          );
          result.link.href = `news13://presentlayout?screenname=channel&dstype=atom_feed&dsurl=${innerLink}`;
        } else if (item.itemType && item.itemType == 'link') {
          result.link.href = addShareParamsToLink(item.link);
        }
      }

      if (item.video && item.video.referenceId) {
        result.extensions.analytics_extra_params.referenceId = item.video.referenceId.toString();
      }

      if (item.video && item.video.timestamp) {
        result.extensions.video_start_time = moment(
          new Date(item.video.timestamp)
        ).unix();
      }

      if (item.link) {
        result.extensions.analytics_extra_params.page_url = item.link;
      }

      if (item.categoryLabel) {
        result.extensions.analytics_extra_params.page_category =
          item.categoryLabel;
      }

      if (item.itemType) {
        result.extensions.analytics_extra_params.page_type = item.itemType;
      }

      if (item.writer && item.writer.length > 0 && item.writer[0].title) {
        result.extensions.analytics_extra_params.page_writer =
          item.writer[0].title;
      }

      if (item.publishDate) {
        result.extensions.analytics_extra_params.Page_PublishDate = new Date(
          item.publishDate
        ).getTime();
      }

      for (let i = 1; i < 7; i++) {
        if (item['category' + i]) {
          result.extensions.analytics_extra_params['Page_' + i + '_level_heb'] =
            item['category' + i].title;
        }
      }

      if (item.tags) {
        item.tags = item.tags.map(atag => {
          if (atag.title) {
            return atag.title;
          }
          return '';
        });
        result.extensions.analytics_extra_params.Page_Tags = tags.join(',');
      }
    } catch (e) {
      //result.error = e;
    }

    return result;
  };
}
