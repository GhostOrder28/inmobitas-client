import styled from 'styled-components';

const borderStyle = `
  border-top: 1px solid #edeff5;
`;

const cellStyle = `
  padding: 1rem 1rem;
`;

const rowStyle = `
  width: inherit;
  cursor: pointer;

  &:hover {
    background-color: #F9FAFC;
  }
`;

export const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    font-size: .875rem;
`

export const StyledThead = styled.thead`
  ${borderStyle}
  background-color: #F9FAFC;
  color: #696f8c;
`;

export const StyledTbody = styled.tbody`
  ${borderStyle}
  color: #474d66;
`;

export const StyledTr = styled.tr.attrs(props => ({
  onClick: props.clickFn
}))`
  ${borderStyle}
  ${rowStyle}
`;

export const StyledTh = styled.th`
  ${cellStyle}
  white-space: nowrap;
`;

export const StyledThWithSpan = styled.th.attrs(props => ({
  colSpan: props.spanValue,
  onClick: props.clickFn
}))`
  ${cellStyle}
  text-align: left;
`;

export const StyledTdUnwrapped = styled.td`
  ${cellStyle}
  white-space: nowrap;
`;

export const StyledTdWrapped = styled.td.attrs(props => ({
  onClick: props.clickFn
}))`
  ${cellStyle}
  white-space: normal;
`;
