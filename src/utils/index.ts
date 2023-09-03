export const deleteEmptyAttribute = (obj: {
  [key: string]: string | undefined | null;
}) => {
  const keys = Object.keys(obj);
  for (let key of keys) {
    if (obj[key] === "" || obj[key] === null || obj[key] === undefined)
      delete obj[key];
  }
  return obj;
};

export const extractLinksFromContent = (content: string) => {
  const urlRegex = /!?\[([^\]]*)\]\(([^\)]+)\)/gm;
  const results = content.matchAll(urlRegex);
  const links = [];
  for (let m of results) {
    links.push(m[2]);
  }
  return links;
};
