/* eslint-disable prettier/prettier */
import { IGeoApiResponseItem } from '../interfaces/IGeoApiResponse';

export const removeDuplicatesByFullName = (
  data: IGeoApiResponseItem[],
): IGeoApiResponseItem[] => {
  const uniqueItems: { [fullname: string]: IGeoApiResponseItem } = {};

  for (const item of data) {
    const fullname = `${item.name}, ${item.state ? item.state + ', ' : ''}${
      item.country
    }`;
    uniqueItems[fullname] = item;
  }

  return Object.values(uniqueItems);
};
