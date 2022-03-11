import React, { useState } from 'react';
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

const ListingDetail = ({ data, photosUrls, table }) => {

  return (
    <div>
      {
        photosUrls && photosUrls.length
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
