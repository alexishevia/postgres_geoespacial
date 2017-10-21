import { SET_ACTIVE_STOP } from '../actionTypes';
import { removeStop } from '../actions';

/*
 * Set the currently active stop
 */
export default (id) => (dispatch, getState) => {
  dispatch({ type: SET_ACTIVE_STOP, payload: { id } });
  if (id !== 'new') {
    dispatch(removeStop('new'));
  }
};
