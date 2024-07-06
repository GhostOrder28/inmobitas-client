import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Pane } from 'evergreen-ui';
import { useTranslation } from 'react-i18next';

import http from '../../http/http';
import { ListingItem } from './listings-page.types';
import { selectCurrentUserId } from '../../redux/user/user.selectors';
import CustomTable from '../../components/custom-table/custom-table.component';
import '../../global-styles/listings-page-scroll.styles.css';
import { LABELS } from './listings-page.consts';
import NoDataMessage from '../../components/no-data-message/no-data-message.component';

const ListingsPage = () => {

  const [listings, setListings] = useState<ListingItem[]>([]);
  const [noListings, setNoListings] = useState<boolean>(false);
  const userId = useSelector(selectCurrentUserId);
  const { t } = useTranslation(['listing', 'ui']);

  useEffect(() => {
    (async function () {
      try {
        const res = await http.get<ListingItem[]>(`/listings/${userId}`);
        if (res.data.length) {
          setListings(res.data)
        } else {
          setNoListings(true);
        }
      } catch (err) {
        console.log(err);
      }
    })()
  }, [])

  return (
    <Pane>
      { noListings &&
        <NoDataMessage
          messageText={t('noListings', { ns: 'ui' }) + ', '}
          linkText={t('startAddingOne', { ns: 'ui' })}
          url={'/newlisting'}
        /> 
      }
      {
        listings.length ?
        <CustomTable 
          source={ listings }
          setSource={setListings}
          labels={ LABELS }
          detailRouteStructure={['listingdetail', 'clientId', 'estateId']}
          editRouteStructure={['editlisting', 'clientId', 'estateId']}
          deleteBaseUrl={'/listings'}
          deleteMessage={ t('waitForListingDelete', { ns: 'ui' }) }
        /> : ''
      }
    </Pane>
  )
};

export default ListingsPage;
