import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { selectCurrentUserId } from '../../redux/user/user.selectors';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import {
  estateLabels,
  ownerLabels,
  contractLabels,
  locationLabels,
  featuresLabels,
  ownerPreferencesLabels,
} from '../../constants/language/english/english-labels.constants';
import ListingForm from '../../components/listing-form/listing-form.component';
import ListingDetail from '../../components/listing-detail/listing-detail.component';
import InfoTable from '../../components/info-table/info-table.component';
const ListingPage = () => {

  const location = useLocation();
  const params = useParams();
  console.log(params);
  const [listing, setListing] = useState(null);
  const [presets, setPresets] = useState(null);
  const userId = useSelector(selectCurrentUserId);

  // useEffect(() => {
    // console.log('re-rendering...');
    // console.log('listing page', listing);
    // console.log('presets', presets);
  // })

  useEffect(() => {
    (async function () {
      try {
        if (location.pathname !== '/newlisting') {
          const listingData = await axios.get(`http://${process.env.REACT_APP_HOST_FOR_MOBILE}:3001/listing/${userId}/${params.listingid}`);
          const dataPresets = await axios.get(`http://${process.env.REACT_APP_HOST_FOR_MOBILE}:3001/listingformdata`);
          setListing(listingData.data[0]);
          setPresets(dataPresets.data);
        } else {
          const dataPresets = await axios.get(`http://${process.env.REACT_APP_HOST_FOR_MOBILE}:3001/listingformdata`);
          setPresets(dataPresets.data);
        }
      } catch (err) {
        console.log(err);
      }
    })()
  },[])

  switch (location.pathname) {
    case '/newlisting':
      return <ListingForm dataPresets={presets}/>
    case `/editlisting/${params.listingid}`:
      return <ListingForm dataPresets={presets} data={listing}/>
    case `/listingdetail/${params.listingid}`:
      return <ListingDetail dataPresets={presets} data={listing}/>
    default:
      return 'no route matched...'
  }

};

export default ListingPage;
