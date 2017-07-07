import update from 'react-addons-update';
import { SWITCHTAB } from '../actions';

const initialState = {
  id: 0,
};

const tabs = (state = initialState, { type, payload }) => {
  switch (type) {
    case SWITCHTAB:
      return update(state, {
        $merge: {id: payload.id}
      });
    default:
      return state;
  }
};

export default tabs;
