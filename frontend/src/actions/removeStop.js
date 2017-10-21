import { REMOVE_STOP } from '../actionTypes';

/*
 * Remove stop from local store
 */
export default (id) => ({
  type: REMOVE_STOP,
  payload: { id },
});
