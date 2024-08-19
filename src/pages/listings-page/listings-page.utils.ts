import { ListingItem } from "./listings-page.types";

export const getSummarizedEstateProps = (listings: ListingItem[]) => {
  const filteredEstateProps = listings.map(listing => {
    const { totalArea, builtArea, ...remainingProps } = listing;
    return { ...remainingProps } 
  });
  return filteredEstateProps;
}

