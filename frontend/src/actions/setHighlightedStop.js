import { SET_HIGHLIGHTED_STOP } from '../actionTypes';

/*
 * Set the highlighted stop.
 */
export default (id) => ({
  type: SET_HIGHLIGHTED_STOP,
  payload: { id },
});
