import React, { useState, useEffect, lazy, Suspense } from 'react';
import http from '../../utils/axios-instance';
import { selectCurrentUserId } from '../../redux/user/user.selectors';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { Spinner } from 'evergreen-ui'

import { Presets, Listing } from './listing-page.types';

const ListingForm = lazy(() => import('../../components/listing-form/listing-form.component'));
const ListingDetail = lazy(() => import('../../components/listing-detail/listing-detail.component'));

const ListingPage = () => {

  const location = useLocation();
  const params = useParams();
  const [listing, setListing] = useState<Listing>();
  const [presets, setPresets] = useState<Presets>();
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
          const listingData = await http.get<Listing>(`/listing/${userId}/${params.listingid}`);
          const dataPresets = await http.get<Presets>(`/listingformdata`);
          setListing(listingData.data);
          setPresets(dataPresets.data);
        } else {
          const dataPresets = await http.get<Presets>(`/listingformdata`);
          setPresets(dataPresets.data);
        }
      } catch (err) {
        console.log(err);
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  switch (location.pathname) {
    case '/newlisting':
      return (
        <Suspense fallback={<Spinner />}>
          <ListingForm dataPresets={presets} setListing={setListing} />
        </Suspense>
      )
    case `/editlisting/${params.listingid}`:
      return (
        <Suspense fallback={<Spinner />}>
          <ListingForm dataPresets={presets} listing={listing} setListing={setListing} />
        </Suspense>
      )
    case `/listingdetail/${params.listingid}`:
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
