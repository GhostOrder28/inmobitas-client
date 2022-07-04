import React, { useState, useEffect } from 'react';
import http from '../../utils/axios-instance';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { strParseOut } from '../../utils/utility-functions';
import { selectCurrentUserId } from '../../redux/user/user.selectors';
import { useTranslation } from "react-i18next";
import {
  StyledTable,
  StyledThead,
  StyledTbody,
  StyledTr,
  StyledTh,
  StyledTdWrapped,
} from '../../global-styles/table.styles'
import { Pane } from 'evergreen-ui';
import '../../global-styles/listings-page-scroll.styles.css';

const OwnersPage = () => {

  const [clients, setClients] = useState<ClientItem[]>([]);
  const navigate = useNavigate();
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
    <Pane overflow={'scroll'} borderColor={'black'} elevation={0}>
      <StyledTable>
        <StyledThead>
          <StyledTr>
            <StyledTh>{ t('name') }</StyledTh>
            <StyledTh>{ t('phone') }</StyledTh>
            <StyledTh>{ t('clientType') }</StyledTh>
          </StyledTr>
        </StyledThead>
        <StyledTbody>
          {
            clients.map((client, idx) => (
              <StyledTr onClick={() => navigate(`/clientdetail/${client.clientId}`)} key={idx}>
                <StyledTdWrapped>{strParseOut(client.clientName)}</StyledTdWrapped>
                <StyledTdWrapped>{client.clientContactPhone}</StyledTdWrapped>
                <StyledTdWrapped>{strParseOut(client.clientType)}</StyledTdWrapped>
              </StyledTr>
            ))
          }
        </StyledTbody>
      </StyledTable>
    </Pane>
  )
};

type ClientItem = {
  clientId: number;
  clientName: string;
  clientContactPhone: number;
  clientAge: number | null;
  clientType: string;
  clientDetails: string | null;
}

export default OwnersPage;
