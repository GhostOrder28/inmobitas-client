import { ListingItem } from "./listings-page.types";

export const filterListingsProps = (listings: ListingItem[]) => {
  const filteredListingProps = listings.map(listing => {
    const { totalArea, builtArea, ...remainingProps } = listing;
    return { ...remainingProps } 
  });
  return filteredListingProps;
}

