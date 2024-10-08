import React from "react";
import { PaneProps } from "evergreen-ui";
import { ClientItem } from "../../pages/clients-page/clients-page.types";
import { ListingItem } from "../../pages/listings-page/listings-page.types";
import { Row } from "react-table";
import { Entity } from "../../types/global.types";

export type CustomTableProps = {
  source: (ListingItem | ClientItem)[];
  setSource: React.Dispatch<React.SetStateAction<any[]>>;
  labels: string[];
  deleteMessage: string;
  entity: Entity;
} & PaneProps;

export type ItemIds = {
  [index: string]: number;
};

export type CustomTableColumn = {
  Header: string;
  accessor: string;
}

export type CustomTableRow = Row<{
  [index: string]: any;
}>

