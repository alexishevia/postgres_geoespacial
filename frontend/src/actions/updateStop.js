import { addStop } from '../actions';
import { handleFetchErrors } from '../helpers';
import {
  UPDATE_STOP_START,
  UPDATE_STOP_SUCCESS,
  UPDATE_STOP_ERROR,
} from '../actionTypes';

/*
 * Update stop in API
 */
export default (data) => (dispatch, getState) => {
  dispatch({ type: UPDATE_STOP_START, payload: data });

  fetch(`${process.env.REACT_APP_API_HOST}/stops/${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(handleFetchErrors)
    .then(res => res.json())
    .then(updatedStop => {
      dispatch({ type: UPDATE_STOP_SUCCESS, payload: updatedStop});
      dispatch(addStop(updatedStop));
    })
    .catch(() => (
      dispatch({
        type: UPDATE_STOP_ERROR,
        payload: new Error('Error al actualizar parada.'),
      })
    ))
};
