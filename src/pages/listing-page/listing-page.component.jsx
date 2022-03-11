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
  const [clients, setClients] = useState([]);
  const userId = useSelector(selectCurrentUserId);

  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get(`http://${process.env.REACT_APP_HOST_FOR_MOBILE}:3001/listing/${userId}/${params.listingid}`)
        setClients(res.data[0])
      } catch (err) {
        console.log(err);
      }
    })()
  },[])

  return (
    location.pathname === '/newlisting' ?
      <ListingForm /> :
      <ListingDetail
        // photosUrls={entity.photosUrls}
        table={
          <InfoTable
            data={clients}
            layout={[
              {
                groupName: ownerLabels.OWNER_INFO,
                rows: [
                { label: ownerLabels.NAME, dbColumn: 'clientName' },
                { label: ownerLabels.CONTACT_PHONE, dbColumn: 'clientContactPhone' },
                ]
              },
              {
                groupName: contractLabels.CONTRACT,
                rows: [
                { label: contractLabels.CONTRACT_TYPE, dbColumn: 'contractType' },
                { label: estateLabels.PRICE, dbColumn: 'price' },
                { label: contractLabels.FEE, dbColumn: clients.feeAmount ? 'feeAmount' : 'feePercentage' },
                { label: contractLabels.SIGNED_DATE, dbColumn: 'signedDate' },
                { label: contractLabels.START_DATE, dbColumn: 'startDate' },
                { label: contractLabels.END_DATE, dbColumn: 'endDate' },
                ]
              },
              {
                groupName: locationLabels.LOCATION,
                rows: [
                { label: locationLabels.DISTRICT, dbColumn: 'district' },
                { label: locationLabels.NEIGHBORHOOD, dbColumn: 'neighborhood' },
                { label: locationLabels.ADDRESS_DETAILS, dbColumn: 'addressDetails' },
                ]
              },
              {
                groupName: featuresLabels.FEATURES,
                rows: [
                { label: featuresLabels.BEDROOMS, dbColumn: 'numberOfBedrooms' },
                { label: featuresLabels.BATHROOMS, dbColumn: 'numberOfBathrooms' },
                { label: featuresLabels.GARAGES, dbColumn: 'numberOfGarages' },
                { label: featuresLabels.KITCHENS, dbColumn: 'numberOfKitchens' },
                { label: featuresLabels.NATURAL_GAS, dbColumn: 'naturalGas' },
                ]
              },
              {
                groupName: ownerPreferencesLabels.OWNER_PREFERENCES,
                rows: [
                { label: ownerPreferencesLabels.PETS_ALLOWED, dbColumn: 'petsAllowed' },
                { label: ownerPreferencesLabels.CHILDREN_ALLOWED, dbColumn: 'childrenAllowed' },
                { label: ownerPreferencesLabels.DETAILS, dbColumn: 'ownerPreferencesDetails' },
                ]
              },
            ]}
          />
        }
      />
  )

};

export default ListingPage;
