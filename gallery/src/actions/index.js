export const INVERSE = 'INVERSE';
export const CENTER = 'CENTER';
export const REARRANGE = 'REARRANGE';
export const SET_POSITION = 'SET_POSITION';

export const inverse = (e, index) => ({
  type: INVERSE,
  payload: { e, index }
});
export const center = (e, constant, index) => ({
  type: CENTER,
  payload: { e, constant, index }
});
export const setPosition = (constant) => ({
  type: SET_POSITION,
  payload: { constant }
});
export const rearrange = (constant, index) => ({
  type: REARRANGE,
  payload: { constant, index }
});
