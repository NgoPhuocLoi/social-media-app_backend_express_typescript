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
