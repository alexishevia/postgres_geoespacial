import { ADD_STOP } from '../actionTypes';

/*
 * Add (or update) stop on local store.
 */
export default (data) => ({
  type: ADD_STOP,
  payload: data,
});
