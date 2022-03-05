import React from 'react';
import { strParseOut } from '../../utils/utility-functions';
import {
  StyledTable,
  StyledTbody,
  StyledTr,
  StyledTdWrapped,
  StyledTdUnwrapped,
} from '../../global-styles/table.styles'
import ImageGallery from 'react-image-gallery';
import { Pane, Heading } from 'evergreen-ui';
import { ownerLabels, globalLabels } from '../../constants/language/english/english-labels.constants';
import "react-image-gallery/styles/css/image-gallery.css";

const OwnerDetail = ({ data }) => {
  return (
    <div>
      <Pane margin={10}>
        <Heading is={'h1'} size={800} marginBottom={20}>
          {strParseOut(data.name)}
        </Heading>
        <StyledTable>
          <StyledTbody>
            <StyledTr>
              <StyledTdUnwrapped>{globalLabels.CONTACT_PHONE}</StyledTdUnwrapped>
              <StyledTdWrapped>{data.contactPhone}</StyledTdWrapped>
            </StyledTr>
            <StyledTr>
              <StyledTdUnwrapped>{ownerLabels.AGE}</StyledTdUnwrapped>
              <StyledTdWrapped>{data.age}</StyledTdWrapped>
            </StyledTr>
            <StyledTr>
              <StyledTdUnwrapped>{ownerLabels.CIVIL_STATUS}</StyledTdUnwrapped>
              <StyledTdWrapped>{strParseOut(data.civilStatus)}</StyledTdWrapped>
            </StyledTr>
            <StyledTr>
              <StyledTdUnwrapped>{ownerLabels.FIRST_TIME}</StyledTdUnwrapped>
              <StyledTdWrapped>{strParseOut(data.firstTime)}</StyledTdWrapped>
            </StyledTr>
            <StyledTr>
              <StyledTdUnwrapped>{ownerLabels.NOTES}</StyledTdUnwrapped>
              <StyledTdWrapped>{data.notes}</StyledTdWrapped>
            </StyledTr>
          </StyledTbody>
        </StyledTable>
      </Pane>
    </div>
  )
};

export default OwnerDetail;
