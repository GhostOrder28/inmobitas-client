import React, { FC, useState, useRef, useEffect } from 'react';
import {
  Pane,
  Table, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell,
  TableHeaderCell,
} from "evergreen-ui";

import useRelativeHeight from '../../hooks/use-relative-height';

import { SpecificationTableGroup } from './specification-table.types';
 
type SpecificationtTableProps = {
  source: SpecificationTableGroup[];
}

const SpecificationTable: FC<SpecificationtTableProps> = ({ source }) => {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const tableHeight = useRelativeHeight(tableRef);
  const headers = source.map(group => group.header);
  const groupSwitcher = headers.reduce((acc, curr) => {
    return { ...acc, [curr]: false }
  }, {})

  const [hiddenGroups, setHiddenGroups] = useState<{ [index: string]: boolean }>(groupSwitcher)
  return (
    <Table> {/* why i can't give a ref to Table being that it is just a div under the hood? */}
      <Pane ref={tableRef} height={tableHeight} overflow={'scroll'}>
        { source && source.map((group, idx) => {
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
            { header }
            </TableHeaderCell>
          </TableHead>
            { !hiddenGroups[header] && 
              <TableBody>
                {
                  items.map((item, idx) => (
                    <TableRow key={`item-prop-${idx}`}>
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
