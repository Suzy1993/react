import update from 'react-addons-update';
import { SWITCHDATE } from '../actions';

const now = new Date();
const initialState = {
  year: now.getFullYear(),
  month: now.getMonth() + 1,
  day: now.getDate(),
};

const calendar = (state = initialState, { type, payload }) => {
  switch (type) {
  	case SWITCHDATE:
      return update(state, {
        $merge: {
          year: payload.date.year,
          month: payload.date.month,
          day: payload.date.day
        }
      });
    default:
      return state;
  }
};

export default calendar;
