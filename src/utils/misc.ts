export const tagToString = (tag: string) => {
  return `#${tag.toLowerCase().replace(" ", "-")}`;
};
