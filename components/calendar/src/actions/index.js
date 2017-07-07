export const SWITCHDATE = 'SWITCH_DATE';

export const switchDate = (date) => ({
  type: SWITCHDATE,
  payload: {
  	date
  },
});