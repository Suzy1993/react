export const ACTIVATE = 'ACTIVATE';

export const activate = (activeIndex) => ({
  type: ACTIVATE,
  payload: {
  	activeIndex,
  },
});