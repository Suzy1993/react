import update from 'react-addons-update';
import { INITDATA, SWITCHPAGE, SETPAGESIZE, GOTOPAGE } from '../actions';

const initialState = {
  items: [],
  pageSize: 3,
  totalPage: 0,
  totalItem: 0,
  pageNo: 1,
};

const paginator = (state = initialState, { type, payload }) => {
  switch (type) {
    case INITDATA:
      return update(state, {
        $merge: payload.dataObj
      });
    case SWITCHPAGE:
      return update(state, {
        $merge: {pageNo: payload.pageNo}
      });
    case SETPAGESIZE:
      return update(state, {
        $merge: {
          pageSize: payload.pageSize,
          totalPage: Math.ceil(state.totalItem / payload.pageSize),
          pageNo: 1,
        }
      });
    case GOTOPAGE:
      return update(state, {
        $merge: {pageNo: payload.pageNo}
      });
    default:
      return state;
  }
};

export default paginator;
