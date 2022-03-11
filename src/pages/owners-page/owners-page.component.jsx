import React, { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useTable } from 'react-table';
import { Link, useNavigate } from 'react-router-dom';
import { strParseOut } from '../../utils/utility-functions';
import { selectCurrentUserId } from '../../redux/user/user.selectors';
// import ownersData from '../../assets/data/owners.data';
import { ownerLabels, contractLabels } from '../../constants/language/english/english-labels.constants';
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

  const [width, setWidth] = useState(window.innerWidth);
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();
  const userId = useSelector(selectCurrentUserId);

  useEffect(() => {

    (async function () {
      try {
        const res = await axios.get(`http://${process.env.REACT_APP_HOST_FOR_MOBILE}:3001/clients/${userId}`)
        console.log(res);
        setClients(res.data)
      } catch (err) {
        console.log(err);
      }
    })()

  }, [])

  return (
    <Pane overflow={'scroll'} borderColor={'black'} elevation={0}>
      <StyledTable>
        <StyledThead>
          <StyledTr>
            <StyledTh>{ownerLabels.NAME}</StyledTh>
            <StyledTh>{ownerLabels.CONTACT_PHONE}</StyledTh>
            <StyledTh>{ownerLabels.CLIENT_TYPE}</StyledTh>
          </StyledTr>
        </StyledThead>
        <StyledTbody>
          {
            clients.map((client, idx) => (
              <StyledTr clickFn={() => navigate(`/clientdetail/${client.clientId}`)} key={idx}>
                <StyledTdWrapped>{strParseOut(client.name)}</StyledTdWrapped>
                <StyledTdWrapped>{strParseOut(client.contactPhone)}</StyledTdWrapped>
                <StyledTdWrapped>{strParseOut(client.clientType)}</StyledTdWrapped>
              </StyledTr>
            ))
          }
        </StyledTbody>
      </StyledTable>
    </Pane>
  )
};

export default OwnersPage;
