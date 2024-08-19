import { useState } from "react";
import { majorScale, minorScale } from "evergreen-ui";
import { Pane, TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from "evergreen-ui";
import { parseCamellCase } from "../../../utils/utility-functions/utility-functions";
import { TableSection } from "../detailed-table.types";

const TableSection = ({ header, items }: TableSection) => {
  const [ show, setShow ] = useState(true);

  return (
    <Pane>
      <TableHead
        cursor={"pointer"}
        onClick={() => setShow((prev) => !prev)}
      >
        <TableHeaderCell>
        { parseCamellCase(header) }
        </TableHeaderCell>
      </TableHead>
      { show && 
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
};
