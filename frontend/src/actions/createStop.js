import { addStop } from '../actions';
import { handleFetchErrors } from '../helpers';
import {
  CREATE_STOP_START,
  CREATE_STOP_SUCCESS,
  CREATE_STOP_ERROR,
} from '../actionTypes';

/*
 * Create stop in API
 */
export default (data) => (dispatch, getState) => {
  data = Object.assign({}, data, { id: undefined });

  dispatch({ type: CREATE_STOP_START, payload: data });

  fetch(`${process.env.REACT_APP_API_HOST}/stops`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(handleFetchErrors)
    .then(res => res.json())
    .then(newStop => {
      dispatch({ type: CREATE_STOP_SUCCESS, payload: newStop });
      dispatch(addStop(newStop));
    })
    .catch(() => (
      dispatch({
        type: CREATE_STOP_ERROR,
        payload: new Error('Error al intentar crear parada.'),
      })
    ));
}
