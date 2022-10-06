import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Pane, Heading, Link } from 'evergreen-ui';
import { useTranslation } from 'react-i18next';

import useWindowDimensions from '../../hooks/use-window-dimensions';

import http from '../../utils/axios-instance';
import { ListingItem } from './listings-page.types';
import { selectCurrentUserId } from '../../redux/user/user.selectors';
import CustomTable from '../../components/custom-table/custom-table.component';
import '../../global-styles/listings-page-scroll.styles.css';
import { mobileBreakpoint } from '../../constants/breakpoints.constants';
import { filterListingsProps } from './listings-page.utils';

const ListingsPage = () => {

  const [listings, setListings] = useState<ListingItem[]>([]);
  const userId = useSelector(selectCurrentUserId);
  const { t } = useTranslation(['listing', 'ui']);
  const { windowInnerWidth, windowInnerHeight } = useWindowDimensions();

  useEffect(() => {
    (async function () {
      try {
        const res = await http.get<ListingItem[]>(`/listings/${userId}`)
        console.log(res.data)
        setListings(res.data)
      } catch (err) {
        console.log(err);
      }
    })()
  }, [])

  return (
    <Pane>
      {
        listings.length ?
        <CustomTable 
          source={windowInnerWidth > mobileBreakpoint ? listings : filterListingsProps(listings)}
          setSource={setListings}
          labels={[
            t('district'),
            t('neighborhood'),
            ...(windowInnerWidth > mobileBreakpoint ? [
              t('totalArea') + ' ' + 'm²',
              t('builtArea') + ' ' + 'm²'
            ] : [])
          ]}
          detailRouteStructure={['listingdetail', 'clientId', 'estateId']}
          editRouteStructure={['editlisting', 'clientId', 'estateId']}
          deleteBaseUrl={'/listings'}
        /> : ''
      }
    </Pane>
  )
};

export default ListingsPage;
