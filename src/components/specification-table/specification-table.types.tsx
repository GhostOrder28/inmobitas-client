export type SpecificationTableGroup = {
  header: string;
  items: SpecificationTableItem[];
}

export type SpecificationTableItem = {
  [index: string]: number | string | boolean | null | undefined;
}
