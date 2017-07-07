import update from 'react-addons-update';
import { ACTIVATE } from '../actions';

const initialState = {
  activeIndex: 1,
};

const tabs = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTIVATE:
      return update(state, {
        $merge: {activeIndex: payload.activeIndex}
      });
    default:
      return state;
  }
};

export default tabs;
