export const getPageSize = (tableHeight: number, itemHeight: number) => {
  const pageSize = Math.floor(tableHeight / itemHeight);
  return pageSize;
}

