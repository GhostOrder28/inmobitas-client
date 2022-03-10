import React, { useState } from 'react';
import { strParseOut } from '../../utils/utility-functions';
import {
  StyledTable,
  StyledTbody,
  StyledTr,
  StyledTh,
  StyledThWithSpan,
  StyledThFullWidth,
  StyledTrSubHeader,
  StyledTdWrapped,
  StyledTdUnwrapped,
} from '../../global-styles/table.styles'
import { Heading, Button } from 'evergreen-ui';
import { ownerLabels, listingLabels, globalLabels } from '../../constants/language/english/english-labels.constants';
import "react-image-gallery/styles/css/image-gallery.css";

import ownersData from '../../assets/data/owners.data'; // TODO: this should be fetched

const checkType = value => {
  if (typeof value === 'string') {
    return strParseOut(value)
  }
  if (typeof value === 'number') {
    return String(value).indexOf('.') !== -1 ? `${value*100} %` : `$ ${value}`
  }
};

const TableGroup = ({ content, data }) => {
  const [isHidden, setIsHidden] = useState(false);
  return (
    <StyledTbody>
      <StyledTr clickFn={() => setIsHidden(!isHidden)}>
        <StyledThWithSpan spanValue='2'>
          {content.groupName}
        </StyledThWithSpan>
      </StyledTr>
      {
        !isHidden &&
        content.rows.map((row,idx) => {
          return (
            <StyledTr key={`row-${idx}`}>
              <StyledTdUnwrapped>{strParseOut(row.label)}</StyledTdUnwrapped>
              <StyledTdWrapped>{checkType(data[row.prop])}</StyledTdWrapped>
            </StyledTr>
          )})
      }
    </StyledTbody>
  )
};

const InfoTable = ({ data, layout }) => {

  return (
    <StyledTable>
      {layout.map((group, idx) => (
        // WARNING: I'm doing prop drilling here but TableGroup is never going to
        // trigger a re-render on its parent so isn't that bad at least for now.
        <TableGroup key={`table-group-${idx}`} content={group} data={data}/>
      ))}
    </StyledTable>
  )
};

export default InfoTable;
