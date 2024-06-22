import { useState, useEffect, Dispatch, SetStateAction} from "react";
import { useSelector } from "react-redux";
import http from "../utils/axios-instance";
import { ListingItem } from '../pages/listings-page/listings-page.types';
import { selectCurrentUserId } from "../redux/user/user.selectors";

type FunctionType = (clientId: string | undefined) => [ ListingItem[], Dispatch<SetStateAction<ListingItem[]>> ]

const useGetClientListings: FunctionType = (clientId) => {
  const [clientListings, setClientListings] = useState<ListingItem[]>([]);

  const userId = useSelector(selectCurrentUserId);

  useEffect(() => {
    (async function () {
      try {
        if (clientId) {
          const clientListingsData = await http.get<ListingItem[]>(
            `/listings/${userId}/${clientId}`
          );
          setClientListings(clientListingsData.data);
        } else {
          throw new Error('clientId is undefined')
        };
      } catch (err) {
        throw new Error(`there was an error, ${err}`)
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ clientListings, setClientListings ];
};

export default useGetClientListings;
