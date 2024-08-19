import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { CustomTableProps } from "./custom-table.types";

type RT = [
  number | null,
  Dispatch<SetStateAction<number | null>>
]

const useHighlightRow = (source: CustomTableProps["source"]): RT  => {
  const [ highlightedRow, setHighlightedRow ] = useState<number | null>(null);
  useEffect(() => {
    setHighlightedRow(null)
  }, [ source ])

  return [ highlightedRow, setHighlightedRow ]
};

export {
  useHighlightRow
}
