import { Pane } from 'evergreen-ui';
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import React, { useState, useEffect, useRef } from 'react';

import http from '../../utils/axios-instance';
import { selectCurrentUserId } from '../../redux/user/user.selectors';

import '../../global-styles/listings-page-scroll.styles.css';
import { ClientItem } from './clients-page.types';
import CustomTable from '../../components/custom-table/custom-table.component';

const ClientsPage = () => {

  const [clients, setClients] = useState<ClientItem[]>([]);
  const userId = useSelector(selectCurrentUserId);
  const { t } = useTranslation(['client'])

  useEffect(() => {

    (async function () {
      try {
        const res = await http.get<ClientItem[]>(`/clients/${userId}`)
        setClients(res.data)
      } catch (err) {
        console.log(err);
      }
    })()

  }, [userId])

  return (
    <Pane overflow={'scroll'} borderColor={'black'}>
      {
        clients.length ?
        <CustomTable 
          source={clients}
          setSource={setClients}
          labels={[
            t('name'),
            t('phone'),
          ]}
          detailRouteStructure={['clientdetail', 'clientId']}
          editRouteStructure={['editclient', 'clientId']}
          deleteBaseUrl={'/clients'}
        /> : ''
      }
    </Pane>
  )
};

export default ClientsPage;
