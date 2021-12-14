export const getFileName = (path: string) => {
  const splittedPath = path.split("/");
  return splittedPath[splittedPath.length - 1];
};
