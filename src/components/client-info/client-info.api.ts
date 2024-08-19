import http from "../../http/http";
import { ListingItem } from "../../pages/listings-page/listings-page.types";
import { selectCurrentUserId } from "../../redux/user/user.selectors";
import { store } from "../../redux/redux-store";

const getClientListings = async (clientId: string) => {
  const userId = selectCurrentUserId(store.getState());

  const clientListingsData = await http.get<ListingItem[]>(`/listings/${userId}/${clientId}`);
  return clientListingsData;
};

export {
  getClientListings,
}
