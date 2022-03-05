import React from 'react';
import { strParseOut } from '../../utils/utility-functions';
import {
  StyledTable,
  StyledTbody,
  StyledTr,
  StyledTdWrapped,
  StyledTdUnwrapped,
} from '../../global-styles/table.styles'
import ImageGallery from 'react-image-gallery';
import { Pane } from 'evergreen-ui';
import { ownerLabels, listingLabels, globalLabels } from '../../constants/language/english/english-labels.constants';
import "react-image-gallery/styles/css/image-gallery.css";
import './listing-detail-gallery.styles.css';

import ownersData from '../../assets/data/owners.data'; // TODO: this should be fetched

const ListingDetail = ({ data }) => {

  const getOwner = () => {
    return ownersData.find(owner => owner.id === data.ownerId)
  };

  return (
    <div>
      {
        photosUrls.length
          ? <ImageGallery
            items={
              photosUrls.map(photo => ({
                  original: `${photo}`,
                  thumbnail: `${photo}`
              }))
            }
            thumbnailPosition={'bottom'}
            />
          : ''
      }
      <Pane margin={10}>
        <StyledTable>
          <StyledTbody>
            <StyledTr>
              <StyledTdUnwrapped>{listingLabels.OWNER}</StyledTdUnwrapped>
              <StyledTdWrapped>{strParseOut(getOwner().name)}</StyledTdWrapped>
            </StyledTr>
            <StyledTr>
              <StyledTdUnwrapped>{globalLabels.CONTACT_PHONE}</StyledTdUnwrapped>
              <StyledTdWrapped>{strParseOut(getOwner().contactPhone)}</StyledTdWrapped>
            </StyledTr>
            <StyledTr>
              <StyledTdUnwrapped>{listingLabels.CONTRACT}</StyledTdUnwrapped>
              <StyledTdWrapped>{strParseOut(data.typeOfContract)}</StyledTdWrapped>
            </StyledTr>
            <StyledTr>
              <StyledTdUnwrapped>{listingLabels.DISTRICT}</StyledTdUnwrapped>
              <StyledTdWrapped>{strParseOut(data.district)}</StyledTdWrapped>
            </StyledTr>
            <StyledTr>
              <StyledTdUnwrapped>{listingLabels.COUNTY}</StyledTdUnwrapped>
              <StyledTdWrapped>{strParseOut(data.county)}</StyledTdWrapped>
            </StyledTr>
            <StyledTr>
              <StyledTdUnwrapped>{listingLabels.ADDRESS}</StyledTdUnwrapped>
              <StyledTdWrapped>{strParseOut(data.address)}</StyledTdWrapped>
            </StyledTr>
            <StyledTr>
              <StyledTdUnwrapped>{listingLabels.CONTRACT}</StyledTdUnwrapped>
              <StyledTdWrapped>{strParseOut(data.typeOfContract)}</StyledTdWrapped>
            </StyledTr>
            <StyledTr>
              <StyledTdUnwrapped>{listingLabels.SERVICES_INCLUDED}</StyledTdUnwrapped>
              <StyledTdWrapped>{data.servicesIncluded ? 'Yes' : 'No'}</StyledTdWrapped>
            </StyledTr>
            <StyledTr>
              <StyledTdWrapped>{listingLabels.PRICE}</StyledTdWrapped>
              <StyledTdWrapped>{`$ ${data.price}`}</StyledTdWrapped>
            </StyledTr>
            <StyledTr>
              <StyledTdUnwrapped>{listingLabels.COMMISSION}</StyledTdUnwrapped>
              <StyledTdWrapped>{data.unit === 'percentage' ? `${data.commission} %` : `$ ${data.commission}`}</StyledTdWrapped>
            </StyledTr>
            <StyledTr>
              <StyledTdUnwrapped>{listingLabels.PROPERTY_TYPE}</StyledTdUnwrapped>
              <StyledTdWrapped>{strParseOut(data.propertyType)}</StyledTdWrapped>
            </StyledTr>
            <StyledTr>
              <StyledTdUnwrapped>{listingLabels.FLOOR_LOCATION}</StyledTdUnwrapped>
              <StyledTdWrapped>{data.floorLocation || '-'}</StyledTdWrapped>
            </StyledTr>
            <StyledTr>
              <StyledTdUnwrapped>{listingLabels.FLOORS}</StyledTdUnwrapped>
              <StyledTdWrapped>{data.floors || '-'}</StyledTdWrapped>
            </StyledTr>
            <StyledTr>
              <StyledTdUnwrapped>{listingLabels.TOTAL_AREA}</StyledTdUnwrapped>
              <StyledTdWrapped>{`${data.totalArea} m²`}</StyledTdWrapped>
            </StyledTr>
            <StyledTr>
              <StyledTdUnwrapped>{listingLabels.BUILT_AREA}</StyledTdUnwrapped>
              <StyledTdWrapped>{`${data.builtArea} m²`}</StyledTdWrapped>
            </StyledTr>
            <StyledTr>
              <StyledTdUnwrapped>{listingLabels.BEDROOMS}</StyledTdUnwrapped>
              <StyledTdWrapped>{data.bedrooms || ''}</StyledTdWrapped>
            </StyledTr>
            <StyledTr>
              <StyledTdUnwrapped>{listingLabels.BATHROOMS}</StyledTdUnwrapped>
              <StyledTdWrapped>{data.bathrooms || ''}</StyledTdWrapped>
            </StyledTr>
            <StyledTr>
              <StyledTdUnwrapped>{listingLabels.GARAGES}</StyledTdUnwrapped>
              <StyledTdWrapped>{data.bathrooms || ''}</StyledTdWrapped>
            </StyledTr>
            <StyledTr>
              <StyledTdUnwrapped>{listingLabels.KITCHENS}</StyledTdUnwrapped>
              <StyledTdWrapped>{data.kitchens}</StyledTdWrapped>
            </StyledTr>
            <StyledTr>
              <StyledTdUnwrapped>{listingLabels.NATURAL_GAS}</StyledTdUnwrapped>
              <StyledTdWrapped>{data.naturalGas ? 'Yes' : 'No'}</StyledTdWrapped>
            </StyledTr>
          </StyledTbody>
        </StyledTable>
      </Pane>
    </div>
  )
};

export default ListingDetail;
