export const SWITCHTAB = 'SWITCH_TAB';

export const switchTab = (id) => ({
	type: SWITCHTAB,
  payload: {
  	id
  },
});
