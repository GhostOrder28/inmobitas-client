import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  estateLabels,
  ownerLabels,
  contractLabels,
  locationLabels,
  featuresLabels,
} from '../../constants/language/english/english-labels.constants';
import ListingForm from '../../components/listing-form/listing-form.component';
import ListingDetail from '../../components/listing-detail/listing-detail.component';
import InfoTable from '../../components/info-table/info-table.component';
import listingsData from '../../assets/data/listings.data'; // TODO: this should be fetched
import ownersData from '../../assets/data/owners.data'; // TODO: this should be fetched

const ListingPage = () => {

  const location = useLocation();
  const params = useParams();
  const entity = listingsData.find(listing => Number(listing.id) === Number(params.id));
  const entityOwner = params.id ? ownersData.find(owner => owner.id === entity.ownerId) : '';

  return (
    location.pathname === '/newlisting' ?
      <ListingForm /> :
      <ListingDetail
        photosUrls={entity.photosUrls}
        table={
          <InfoTable
            data={{...entity, ...entityOwner}}
            layout={[
              {
                groupName: ownerLabels.OWNER_INFO,
                rows: [
                { label: ownerLabels.NAME, dbColumn: 'name' },
                { label: ownerLabels.CONTACT_PHONE, dbColumn: 'contact_phone' },
                ]
              },
              {
                groupName: contractLabels.CONTRACT,
                rows: [
                { label: contractLabels.CONTRACT_TYPE, dbColumn: 'contract_type' },
                { label: contractLabels.PRICE, dbColumn: 'price' },
                { label: contractLabels.FEE, dbColumn: { isSale: 'payment_fee', isRental: 'percentage_fee' } },
                { label: contractLabels.SIGNED_DATE, dbColumn: 'signed_date' },
                { label: contractLabels.START_DATE, dbColumn: 'start_date' },
                { label: contractLabels.END_DATE, dbColumn: 'end_date' },
                { label: contractLabels.DETAILS, dbColumn: 'details' },
                ]
              },
              {
                groupName: locationLabels.LOCATION,
                rows: [
                { label: contractLabels.CITY, dbColumn: 'city' },
                { label: contractLabels.DISTRICT, dbColumn: 'district' },
                { label: contractLabels.NEIGHBORHOOD, dbColumn: { isSale: 'payment_fee', isRental: 'percentage_fee' } },
                { label: contractLabels.ADDRESS_DETAILS, dbColumn: 'address_details' },
                ]
              },
              {
                groupName: featuresLabels.FEATURES,
                rows: [
                { label: featuresLabels.BEDROOMS, dbColumn: 'number_of_bedrooms' },
                { label: featuresLabels.BATHROOMS, dbColumn: 'number_of_bathrooms' },
                { label: featuresLabels.GARAGES, dbColumn: 'number_of_garages' },
                { label: featuresLabels.KITCHENS, dbColumn: 'number_of_kitchens' },
                { label: featuresLabels.NATURAL_GAS, dbColumn: 'natural_gas' },
                ]
              },
            ]}
          />
        }
      />
  )

};

export default ListingPage;
