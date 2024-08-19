export type DetailedTable = {
  clientId: number;
  estateId: number;
  contractId: number;
  data: TableSection[];
}

export type TableSection = {
  header: string;
  items: TableSectionItem[];
}

export type TableSectionItem = {
  [index: string]: number | string | boolean | null | undefined;
}
