const getFinish = (totalPage, currentPage) => {
  const center = currentPage + 2;
  let finish = totalPage;
  if (center <= totalPage) {
    finish = center;
  }
  if (currentPage !== 1 && currentPage < finish - 1) {
    finish -= 1;
  }
  return finish;
};

const getStart = (finish, currentPage) => {
  let start = currentPage;
  if (currentPage === finish) {
    start -= 2;
  } else if (currentPage > 1) {
    start -= 1;
  }
  return start;
};

export const getPaginationNumber = (totalPage, currentPage) => {
  const pageNumberList = Array.from(Array(totalPage).keys(), x => x + 1);
  if (totalPage <= 3) {
    return pageNumberList.slice(0, totalPage);
  }
  const finish = getFinish(totalPage, currentPage);
  const start = getStart(finish, currentPage) - 1;
  return pageNumberList.slice(start, finish);
};

export default {
  getPaginationNumber
};
