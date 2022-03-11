import React, { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useTable } from 'react-table';
import { Link, useNavigate } from 'react-router-dom';
import { strParseOut } from '../../utils/utility-functions';
import { selectCurrentUserId } from '../../redux/user/user.selectors';
// import listingsData from '../../assets/data/listings.data';
import {
  estateLabels,
  ownerLabels,
  contractLabels,
  locationLabels,
  featuresLabels,
} from '../../constants/language/english/english-labels.constants';
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

const mobileBreakPoint = 720;

const ListingsPage = () => {

  const [width, setWidth] = useState(window.innerWidth);
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  const userId = useSelector(selectCurrentUserId);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    (async function () {
      try {
        const res = await axios.get(`http://${process.env.REACT_APP_HOST_FOR_MOBILE}:3001/listings/${userId}`)
        console.log(res);
        setListings(res.data)
      } catch (err) {
        console.log(err);
      }
    })()

    return () => window.removeEventListener("resize", handleWindowResize);
  }, [])

  return (
    <Pane overflow={'scroll'} borderColor={'black'} elevation={0}>
      <StyledTable>
        <StyledThead>
          <StyledTr>
            { width < mobileBreakPoint ?
              <>
                <StyledTh>{locationLabels.DISTRICT}</StyledTh>
                <StyledTh>{locationLabels.NEIGHBORHOOD}</StyledTh>
                <StyledTh>{estateLabels.PRICE}</StyledTh>
              </> :
              <>
                <StyledTh>{locationLabels.DISTRICT}</StyledTh>
                <StyledTh>{locationLabels.NEIGHBORHOOD}</StyledTh>
                <StyledTh>{locationLabels.ADDRESS_DETAILS}</StyledTh>
                <StyledTh>{contractLabels.CONTRACT}</StyledTh>
                <StyledTh>{estateLabels.PRICE}</StyledTh>
                {/* <StyledTh>{estateLabels.SERVICES_INCLUDED}</StyledTh> */}
                <StyledTh>{contractLabels.FEE}</StyledTh>
                <StyledTh>{estateLabels.ESTATE_TYPE}</StyledTh>
                <StyledTh>{estateLabels.FLOOR_LOCATION}</StyledTh>
                <StyledTh>{estateLabels.NUMBER_OF_FLOORS}</StyledTh>
                <StyledTh>{estateLabels.TOTAL_AREA}</StyledTh>
                <StyledTh>{estateLabels.BUILT_AREA}</StyledTh>
              </>
            }
          </StyledTr>
        </StyledThead>
        <StyledTbody>
          {
            listings.map((listing, idx) => (
              <StyledTr clickFn={() => navigate(`/listingdetail/${listing.estateId}`)} key={idx}>
                { width < mobileBreakPoint ?
                  <>
                    <StyledTdWrapped>{strParseOut(listing.district)}</StyledTdWrapped>
                    <StyledTdWrapped>{strParseOut(listing.neighborhood)}</StyledTdWrapped>
                    <StyledTdWrapped>{listing.price && `$ ${listing.price}`}</StyledTdWrapped>
                  </> :
                  <>
                    <StyledTdWrapped>{strParseOut(listing.district)}</StyledTdWrapped>
                    <StyledTdWrapped>{strParseOut(listing.neighborhood)}</StyledTdWrapped>
                    <StyledTdWrapped>{strParseOut(listing.addressDetails)}</StyledTdWrapped>
                    <StyledTdWrapped>{strParseOut(listing.contractType)}</StyledTdWrapped>
                    {/* <StyledTdWrapped>{listing.servicesIncluded ? 'Yes' : 'No'}</StyledTdWrapped> */}
                    <StyledTdWrapped>{`$ ${listing.price}`}</StyledTdWrapped>
                    <StyledTdWrapped>{listing.unit === 'percentage' ? `${listing.fee} %` : `$ ${listing.fee}`}</StyledTdWrapped>
                    <StyledTdWrapped>{strParseOut(listing.estateType)}</StyledTdWrapped>
                    <StyledTdWrapped>{listing.floorLocation || '-'}</StyledTdWrapped>
                    <StyledTdWrapped>{listing.numberOfFloors || '-'}</StyledTdWrapped>
                    <StyledTdWrapped>{`${listing.totalArea} m²`}</StyledTdWrapped>
                    <StyledTdWrapped>{`${listing.builtArea} m²`}</StyledTdWrapped>
                  </>
                }
              </StyledTr>
            ))
          }
        </StyledTbody>
      </StyledTable>
    </Pane>
  )
};

export default ListingsPage;
