import React from 'react';
import { ClientItem } from '../../pages/clients-page/clients-page.types';
import { ListingItem } from '../../pages/listings-page/listings-page.types';

export type CustomTableProps = {
  source: (ListingItem | ClientItem)[];
  setSource: React.Dispatch<React.SetStateAction<any[]>>;
  labels: string[];
  detailRouteStructure: string[];
  editRouteStructure: string[];
  deleteBaseUrl: string;
};

export type ItemIds = {
  [index: string]: number;
};

