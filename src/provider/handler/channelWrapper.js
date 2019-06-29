export const channelWrapper = async params => {
  const { id } = params;
  const value = 'feed';
  const type = { value };
  const src = `reshetnewsds://fetchData?type=channel&id=${id}`;
  const content = { src };
  const entry = [{ type, content }];
  const feed = { type, entry };
  return feed;
};
