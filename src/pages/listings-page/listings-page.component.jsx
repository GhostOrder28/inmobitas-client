import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../redux/user/user.selectors';
import { Pane } from 'evergreen-ui';
import ListingsTable from '../../components/listings-table/listings-table.component';
import '../../global-styles/listings-page-scroll.styles.css';

const ListingsPage = () => {

  const [listings, setListings] = useState([]);
  const userId = useSelector(selectCurrentUserId);

  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get(`http://${process.env.REACT_APP_HOST_FOR_MOBILE}:3001/listings/${userId}`)
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
