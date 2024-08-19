import React, { FC, useState, useRef } from "react";
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

import useRelativeHeight from "../../hooks/use-relative-height";

import { parseCamellCase } from "../../utils/utility-functions/utility-functions";
import { Listing, Presets } from "../../pages/listing-page/listing-page.types";
import { formatListingData } from "../listing-info/listing-info.utils";
import useCalculateAppSize from "../../hooks/use-calculate-app-size";
import { TAB_PANEL_SIZE } from "../../constants/sizes.consts";
 
type DetailedTableProps = {
  source: Listing;
  presets: Presets;
}

const DetailedTable  = ({ source, presets }: DetailedTableProps) => {
  const { data: sections } = formatListingData(source, presets);
  const { appHeight } = useCalculateAppSize();
  const headers = sections.map(group => group.header);
  const groupSwitcher = headers.reduce((acc, curr) => {
    return { ...acc, [curr]: false }
  }, {})

  // this is not ideal because I'm initializing a state with a value that comes indirectly from a prop
  // this will be fixed when I migrate to material-ui and use the accordion component
  const [hiddenGroups, setHiddenGroups] = useState<{ [index: string]: boolean }>(groupSwitcher)
  return (
    <Table height={ appHeight - TAB_PANEL_SIZE } overflow="scroll">
        { sections.map((group, idx) => {
          const { header, items } = group;
          return (
          <Pane key={`table-group-${idx}`}>
            <TableHead
              cursor={"pointer"}
              onClick={() => {
                setHiddenGroups({ ...hiddenGroups, [header]: !hiddenGroups[header] });
              }}
            >
              <TableHeaderCell>
              { parseCamellCase(header) }
              </TableHeaderCell>
            </TableHead>
            { 
              <TableBody>
                {
                  items.map((item, idx) => (
                    <TableRow
                      key={`item-prop-${idx}`}
                      minHeight={majorScale(7)}
                      height={"100%"}
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
    </Table>
  ) 
}

export default DetailedTable;
