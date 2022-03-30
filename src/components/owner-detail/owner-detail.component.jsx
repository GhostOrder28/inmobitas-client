import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectCurrentUserId } from '../../redux/user/user.selectors';
import { strParseOut } from '../../utils/utility-functions';
import {
  StyledTable,
  StyledTbody,
  StyledTr,
  StyledThead,
  StyledTh,
  StyledTdWrapped,
  StyledTdUnwrapped,
} from '../../global-styles/table.styles'
import ImageGallery from 'react-image-gallery';
import { Pane, Heading } from 'evergreen-ui';
import {
  locationLabels,
  estateLabels,
  ownerLabels,
} from '../../constants/language/english/english-labels.constants';
import "react-image-gallery/styles/css/image-gallery.css";
import ListingsTable from '../listings-table/listings-table.component';

const OwnerDetail = ({ clientData }) => {

  const [listings, setListings] = useState(null);
  const userId = useSelector(selectCurrentUserId);
  const params = useParams();

  useEffect(() => {

    (async function () {
      try {
        const clientListingsData = await axios.get(`http://${process.env.REACT_APP_HOST_FOR_MOBILE}:3001/listings/${userId}/${params.clientid}`)
        setListings(clientListingsData.data)
      } catch (err) {
        console.log(err);
      }
    })()

  }, [])

  return (
    <div>
      <Pane margin={10}>
        { clientData &&
          <>
            <Heading is={'h1'} size={800} marginBottom={20}>
              { strParseOut(clientData.name) }
            </Heading>
            <StyledTable>
              <StyledTbody>
                <StyledTr>
                  <StyledTdUnwrapped>{ ownerLabels.CLIENT_TYPE }</StyledTdUnwrapped>
                  <StyledTdWrapped>{ clientData.clientType }</StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped>{ ownerLabels.OWNER_CONTACT_PHONE }</StyledTdUnwrapped>
                  <StyledTdWrapped>{ clientData.contactPhone }</StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped>{ ownerLabels.AGE }</StyledTdUnwrapped>
                  <StyledTdWrapped>{ clientData.age }</StyledTdWrapped>
                </StyledTr>
                <StyledTr>
                  <StyledTdUnwrapped>{ ownerLabels.CLIENT_DETAILS }</StyledTdUnwrapped>
                  <StyledTdWrapped>{ clientData.clientDetails }</StyledTdWrapped>
                </StyledTr>
              </StyledTbody>
            </StyledTable>
          </>
        }
      </Pane>
      <Pane margin={10} overflow={'scroll'} borderColor={'black'} heading={'h1'}>
        <Heading is={'h2'} size={600} fontWeight={500} marginBottom={20}>
          { estateLabels.ESTATES }
        </Heading>
        { listings && <ListingsTable listings={listings} /> }
      </Pane>
    </div>
  )
};

export default OwnerDetail;
