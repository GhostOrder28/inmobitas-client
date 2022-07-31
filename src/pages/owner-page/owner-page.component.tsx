import React, { useEffect, useState } from 'react';
import http from '../../utils/axios-instance';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../redux/user/user.selectors';
import { useParams } from 'react-router-dom';
import OwnerDetail from '../../components/owner-detail/owner-detail.component';
import { Client } from '../../components/owner-detail/owner-detail.types';

const OwnerPage = () => {

  const [client, setClient] = useState<Client>();
  const params = useParams();
  const userId = useSelector(selectCurrentUserId);

  useEffect(() => {

    (async function () {
      try {
        const clientData = await http.get<Client>(`/clients/${userId}/${params.clientid}`)
        setClient(clientData.data)
      } catch (err) {
        console.log(err);
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <OwnerDetail
      clientData={ client }
    />

  )


};

export default OwnerPage;
