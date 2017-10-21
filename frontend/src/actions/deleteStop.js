import { removeStop } from '../actions';
import { handleFetchErrors } from '../helpers';
import {
  DELETE_STOP_START,
  DELETE_STOP_SUCCESS,
  DELETE_STOP_ERROR,
} from '../actionTypes';

/*
 * Delete stop from API
 */
export default (id) => (dispatch, getState) => {
  dispatch({ type: DELETE_STOP_START, payload: { id } });

  fetch(`${process.env.REACT_APP_API_HOST}/stops/${id}`, {
    method: 'DELETE',
  })
  .then(handleFetchErrors)
  .then(() => {
    dispatch({ type: DELETE_STOP_SUCCESS, payload: { id }});
    dispatch(removeStop(id));
  })
  .catch(() => {
    dispatch({
      type: DELETE_STOP_ERROR,
      payload: new Error('Error al tratar de eliminar la parada.'),
    })
  });
};
