import http from "../../utils/axios-instance";
import { ListingItem } from "../../pages/listings-page/listings-page.types";

const getClientListings = async (route: string) => {
  try {
    const clientListingsData = await http.get<ListingItem[]>(route);
    return clientListingsData;

    // this condition was here before but I'm not sure why I put it here
    // because it is not necessary to perform the request
    //
    // if (clientId) {
    //   const clientListingsData = await http.get<ListingItem[]>(route);
    //   setClientListings(clientListingsData.data);
    // } else {
    //   throw new Error('clientId is undefined')
    // };
  } catch (err) {
    throw new Error(`there was an error, ${err}`)
  }
};

export {
  getClientListings,
}
