import React, { useMemo, useState, useEffect } from 'react';
import { useTable } from 'react-table';
import { Link, useNavigate } from 'react-router-dom';
import { strParseOut } from '../../utils/utility-functions';
import listingsData from '../../assets/data/listings.data';
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
  const navigate = useNavigate();

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
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
                <StyledTh>{locationLabels.CITY}</StyledTh>
                <StyledTh>{locationLabels.DISTRICT}</StyledTh>
                <StyledTh>{locationLabels.NEIGHBORHOOD}</StyledTh>
                <StyledTh>{locationLabels.ADDRESS_DETAILS}</StyledTh>
                <StyledTh>{contractLabels.CONTRACT}</StyledTh>
                <StyledTh>{estateLabels.PRICE}</StyledTh>
                <StyledTh>{estateLabels.SERVICES_INCLUDED}</StyledTh>
                <StyledTh>{contractLabels.FEE}</StyledTh>
                <StyledTh>{estateLabels.PROPERTY_TYPE}</StyledTh>
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
            listingsData.map((listing, idx) => (
              <StyledTr clickFn={() => navigate(`/listingdetail/${listing.id}`)} key={idx}>
                { width < mobileBreakPoint ?
                  <>
                    <StyledTdWrapped>{strParseOut(listing.district)}</StyledTdWrapped>
                    <StyledTdWrapped>{strParseOut(listing.neighborhood)}</StyledTdWrapped>
                    <StyledTdWrapped>{`$ ${listing.price}`}</StyledTdWrapped>
                  </> :
                  <>
                    <StyledTdWrapped>{strParseOut(listing.city)}</StyledTdWrapped>
                    <StyledTdWrapped>{strParseOut(listing.district)}</StyledTdWrapped>
                    <StyledTdWrapped>{strParseOut(listing.neighborhood)}</StyledTdWrapped>
                    <StyledTdWrapped>{strParseOut(listing.addressDetails)}</StyledTdWrapped>
                    <StyledTdWrapped>{strParseOut(listing.typeOfContract)}</StyledTdWrapped>
                    <StyledTdWrapped>{listing.servicesIncluded ? 'Yes' : 'No'}</StyledTdWrapped>
                    <StyledTdWrapped>{`$ ${listing.price}`}</StyledTdWrapped>
                    <StyledTdWrapped>{listing.unit === 'percentage' ? `${listing.fee} %` : `$ ${listing.fee}`}</StyledTdWrapped>
                    <StyledTdWrapped>{strParseOut(listing.propertyType)}</StyledTdWrapped>
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
