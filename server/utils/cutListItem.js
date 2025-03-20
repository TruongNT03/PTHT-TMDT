const cutListItem = (arr, currentPage) => {
  const pageSize = process.env.PAGE_SIZE || 10;
  const indexStartItem = currentPage * pageSize;
  return arr.splice(0, indexStartItem);
};

export default cutListItem;
