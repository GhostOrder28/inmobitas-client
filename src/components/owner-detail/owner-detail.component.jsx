import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
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
import { ownerLabels, globalLabels, locationLabels, estateLabels } from '../../constants/language/english/english-labels.constants';
import "react-image-gallery/styles/css/image-gallery.css";

const OwnerDetail = ({ table, clientName }) => {

  const [listings, setListings] = useState([]);
  const userId = useSelector(selectCurrentUserId);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {

    (async function () {
      try {
        const res = await axios.get(`http://${process.env.REACT_APP_HOST_FOR_MOBILE}:3001/listings/${userId}/${params.clientid}`)
        setListings(res.data)
      } catch (err) {
        console.log(err);
      }
    })()

  }, [])

  return (
    <div>
      <Pane margin={10}>
        <Heading is={'h1'} size={800} marginBottom={20}>
          {strParseOut(clientName)}
        </Heading>
        {table}
      </Pane>
      <Pane margin={10} overflow={'scroll'} borderColor={'black'} heading={'h1'}>
        <Heading is={'h2'} size={600} fontWeight={500} marginBottom={20}>
          {estateLabels.ESTATES}
        </Heading>
        <StyledTable>
          <StyledThead>
            <StyledTr>
              <StyledTh>{locationLabels.DISTRICT}</StyledTh>
              <StyledTh>{locationLabels.NEIGHBORHOOD}</StyledTh>
              <StyledTh>{estateLabels.PRICE}</StyledTh>
            </StyledTr>
          </StyledThead>
          <StyledTbody>
            {
              listings.map((listing, idx) => (
                <StyledTr clickFn={() => navigate(`/listingdetail/${listing.estateId}`)} key={idx}>
                  <StyledTdWrapped>{strParseOut(listing.district)}</StyledTdWrapped>
                  <StyledTdWrapped>{strParseOut(listing.neighborhood)}</StyledTdWrapped>
                  <StyledTdWrapped>{listing.price && `$ ${listing.price}`}</StyledTdWrapped>
                </StyledTr>
              ))
            }
          </StyledTbody>
        </StyledTable>
      </Pane>
    </div>
  )
};

export default OwnerDetail;
