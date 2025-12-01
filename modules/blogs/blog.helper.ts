export const getTimeToRead = (content: string) => {
  const words = content.split(' ').length;
  const minutes = Math.ceil(words / 200);
  return minutes > 1 ? `${minutes} mins` : `${minutes} min`;
};
