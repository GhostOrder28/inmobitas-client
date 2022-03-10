import React, { useMemo, useState, useEffect } from 'react';
import { useTable } from 'react-table';
import { Link, useNavigate } from 'react-router-dom';
import { strParseOut } from '../../utils/utility-functions';
import ownersData from '../../assets/data/owners.data';
import { ownerLabels } from '../../constants/language/english/english-labels.constants';
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

const OwnersPage = () => {

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
                <StyledTh>{ownerLabels.NAME}</StyledTh>
                <StyledTh>{ownerLabels.CONTACT_PHONE}</StyledTh>
              </> :
              <>
                <StyledTh>{ownerLabels.NAME}</StyledTh>
                <StyledTh>{ownerLabels.CONTACT_PHONE}</StyledTh>
                <StyledTh>{ownerLabels.AGE}</StyledTh>
              </>
            }
          </StyledTr>
        </StyledThead>
        <StyledTbody>
          {
            ownersData.map((owner, idx) => (
              <StyledTr clickFn={() => navigate(`/ownerdetail/${owner.id}`)} key={idx}>
                { width < mobileBreakPoint ?
                  <>
                    <StyledTdWrapped>{strParseOut(owner.name)}</StyledTdWrapped>
                    <StyledTdWrapped>{strParseOut(owner.contactPhone)}</StyledTdWrapped>
                  </> :
                  <>
                    <StyledTdWrapped>{strParseOut(owner.name)}</StyledTdWrapped>
                    <StyledTdWrapped>{strParseOut(owner.contactPhone)}</StyledTdWrapped>
                    <StyledTdWrapped>{owner.age}</StyledTdWrapped>
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

export default OwnersPage;
