import React, { useState, useEffect } from 'react';
import http from '../../utils/axios-instance';
import { ListingItem } from './listings-page.types';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../redux/user/user.selectors';
import { Pane } from 'evergreen-ui';
import ListingsTable from '../../components/listings-table/listings-table.component';
import '../../global-styles/listings-page-scroll.styles.css';

const ListingsPage = () => {

  const [listings, setListings] = useState<ListingItem[]>([]);
  const userId = useSelector(selectCurrentUserId);

  useEffect(() => {
    (async function () {
      try {
        const res = await http.get<ListingItem[]>(`/listingslist/${userId}`)
        setListings(res.data)
      } catch (err) {
        console.log(err);
      }
    })()
  }, [])

  return (
    <Pane overflow={'scroll'} borderColor={'black'} elevation={0}>
      { listings && <ListingsTable listings={listings} /> }
    </Pane>
  )
};

export default ListingsPage;
