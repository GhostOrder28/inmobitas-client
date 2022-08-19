export const getPageSize = (tableHeight: number, itemHeight: number) => {
  //console.log(tableHeight)
  const pageSize = Math.floor(tableHeight / itemHeight);
  return pageSize;
}

