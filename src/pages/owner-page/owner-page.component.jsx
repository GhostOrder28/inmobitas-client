import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../redux/user/user.selectors';
import { useLocation, useParams } from 'react-router-dom';
import OwnerDetail from '../../components/owner-detail/owner-detail.component';
import InfoTable from '../../components/info-table/info-table.component';
import { ownerLabels, globalLabels } from '../../constants/language/english/english-labels.constants';

const OwnerPage = () => {

  const [client, setClient] = useState(null);
  const location = useLocation();
  const params = useParams();
  console.log(params);
  const userId = useSelector(selectCurrentUserId);

  useEffect(() => {

    (async function () {
      try {
        const clientData = await axios.get(`http://${process.env.REACT_APP_HOST_FOR_MOBILE}:3001/client/${userId}/${params.clientid}`)
        setClient(clientData.data[0])
      } catch (err) {
        console.log(err);
      }
    })()

  }, [])

  return (
    <OwnerDetail
      clientData={ client }
    />

  )


};

export default OwnerPage;
