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

const ListingDetail = ({ data, photosUrls, table }) => {

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
          : 'There is no photos...'
      }
      <Pane margin={10}>
        {table}
      </Pane>
    </div>
  )
};

export default ListingDetail;
