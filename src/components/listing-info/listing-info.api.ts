import { Listing } from "../../pages/listing-page/listing-page.types";
import { Presets } from "../../pages/listing-page/listing-page.types";
import http from "../../http/http";
import { store } from "../../redux/redux-store";
import { selectCurrentUserId } from "../../redux/user/user.selectors";

const getListingData = async (clientId: string, estateId: string) => {
  const userId = selectCurrentUserId(store.getState());
  const listingData = await http.get<Listing>(`/listings/${userId}/${clientId}/${estateId}`);
  return listingData;
}

const getPresets = async () => {
  const dataPresets = await http.get<Presets>(`/listingpresets`);
  return dataPresets;
};

export {
  getListingData,
  getPresets
}
