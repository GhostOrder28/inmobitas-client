import React, { useState, useEffect, lazy, Suspense } from 'react';
import http from '../../utils/axios-instance';
import { selectCurrentUserId } from '../../redux/user/user.selectors';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { Pane, Spinner } from 'evergreen-ui'
import { AxiosError } from 'axios';

import { Presets, Listing } from './listing-page.types';

const ListingForm = lazy(() => import('../../components/listing-form/listing-form.component'));
const ListingDetail = lazy(() => import('../../components/listing-detail/listing-detail.component'));

const ListingPage = () => {

  const location = useLocation();
  const { clientid, listingid } = useParams();
  const [listing, setListing] = useState<Listing>();
  const [presets, setPresets] = useState<Presets>();
  const [error, setError] = useState<Error | null>(null);
  const userId = useSelector(selectCurrentUserId);

   useEffect(() => {
     console.log('re-rendering...');
     console.log('location: ', location);
     console.log('listing: ', listing);
     console.log('presets: ', presets);
   })

  useEffect(() => {

    (async function () {
      try {
        
        if (location.pathname !== '/newlisting') {
          const listingData = await http.get<Listing>(`/listings/${userId}/${clientid}/${listingid}`);
          const dataPresets = await http.get<Presets>(`/listingpresets`);
          setListing(listingData.data);
          setPresets(dataPresets.data);
        } else {
          const dataPresets = await http.get<Presets>(`/listingpresets`);
          setPresets(dataPresets.data);
        }
      } catch (err) {
        setError((err as AxiosError).response?.data.error)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(() => {
    console.log(error)
  })

  //if (error) return <Pane>{ error }</Pane>

  switch (location.pathname) {
    case '/newlisting':
      return (
        <Suspense fallback={<Spinner />}>
          <ListingForm dataPresets={presets} setListing={setListing} />
        </Suspense>
      )
    case `/editlisting/${clientid}/${listingid}`:
      return (
        <Suspense fallback={<Spinner />}>
          <ListingForm dataPresets={presets} listing={listing} setListing={setListing} />
        </Suspense>
      )
    case `/listingdetail/${clientid}/${listingid}`:
      return (
        <Suspense fallback={<Spinner />}>
          <ListingDetail dataPresets={presets} listing={listing} />
        </Suspense>
      )
    default:
      return <>no route matched...</>
  }

};

export default ListingPage;
