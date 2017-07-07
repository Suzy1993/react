export const INITDATA = 'INIT_DATA';
export const SWITCHPAGE = 'SWITCH_PAGE';
export const SETPAGESIZE = 'SET_PAGESIZE';
export const GOTOPAGE = 'GOTO_PAGE';

export const initData = (dataObj) => ({
  type: INITDATA,
  payload: {
  	dataObj
  },
});

export const switchPage = (pageNo) => ({
  type: SWITCHPAGE,
  payload: {
  	pageNo
  },
});

export const setPageSize = (pageSize) => ({
  type: SETPAGESIZE,
  payload: {
  	pageSize
  },
});

export const gotoPage = (pageNo) => ({
  type: GOTOPAGE,
  payload: {
  	pageNo
  },
});
