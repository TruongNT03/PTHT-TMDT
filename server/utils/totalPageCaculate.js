const pageSize = 10;

const totalPageCaculate = (totalItem) => {
  return Math.ceil(totalItem / pageSize);
};

export default totalPageCaculate;
