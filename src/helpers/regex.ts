export const ORDERED_TITLE_REGEX = /^\d+\.\s*/;

export const removeOrderNumber = (folderTitle: string) => {
  // 폴더 정렬을 위해 붙인 폴더명 앞 숫자 제거
  return folderTitle.replace(ORDERED_TITLE_REGEX, "");
};
