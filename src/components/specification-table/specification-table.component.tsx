import React, { FC, useState, useRef } from 'react';
import {
  Pane,
  Table, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell,
  TableHeaderCell,
  majorScale,
  minorScale,
} from "evergreen-ui";

import useRelativeHeight from '../../hooks/use-relative-height';

import { parseCamellCase } from '../../utils/utility-functions/utility-functions';
import { SpecificationTable as SpecificationTableType } from './specification-table.types';
 
type SpecificationtTableProps = {
  source: SpecificationTableType;
}

const SpecificationTable: FC<SpecificationtTableProps> = ({ source }) => {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const tableHeight = useRelativeHeight(tableRef, { ignorePaginationSpace: true });
  const headers = source.data.map(group => group.header);
  const groupSwitcher = headers.reduce((acc, curr) => {
    return { ...acc, [curr]: false }
  }, {})
  console.log('source: ', source);

  const [hiddenGroups, setHiddenGroups] = useState<{ [index: string]: boolean }>(groupSwitcher)
  return (
    <Table> {/* why i can't give a ref to Table being that it is just a div under the hood? */}
      <Pane ref={tableRef} height={tableHeight} overflow={'scroll'}>
        { source && source.data.map((group, idx) => {
          const { header, items } = group;
          return (
          <Pane key={`table-group-${idx}`}>
          <TableHead
            cursor={'pointer'}
            onClick={() => {
              setHiddenGroups({ ...hiddenGroups, [header]: !hiddenGroups[header] });
            }}
          >
            <TableHeaderCell>
            { parseCamellCase(header) }
            </TableHeaderCell>
          </TableHead>
            { !hiddenGroups[header] && 
              <TableBody>
                {
                  items.map((item, idx) => (
                    <TableRow
                      key={`item-prop-${idx}`}
                      minHeight={majorScale(7)}
                      height={'100%'}
                      paddingY={minorScale(5)}
                    >
                      <TableCell>{ item.label }</TableCell>
                      <TableCell>{ item.value }</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            }
          </Pane>
          )
        })
        }
      </Pane>
    </Table>
  ) 
}

export default SpecificationTable;
