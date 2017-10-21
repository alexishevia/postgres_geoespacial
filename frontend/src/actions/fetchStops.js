import { handleFetchErrors } from '../helpers';
import {
  FETCH_STOPS_START,
  FETCH_STOPS_SUCCESS,
  FETCH_STOPS_ERROR,
} from '../actionTypes';

/*
 * Fetch stops from API
 */
export default () => (dispatch, getState) => {
  const { search, center, advancedSearchActive } = getState();
  const { text, radiusInMeters } = search;
  const query = [];

  // full-text search
  if (text) {
    query.push(`q=${text}`);
  }

  // location search
  if (advancedSearchActive && center.lat && center.lng && radiusInMeters) {
    query.push(`latlondist=${center.lat},${center.lng},${radiusInMeters}`);
  }

  dispatch({
    type: FETCH_STOPS_START,
    payload: { search },
  });

  return fetch(`${process.env.REACT_APP_API_HOST}/stops?${query.join('&')}`)
    .then(handleFetchErrors)
    .then(response => response.json())
    .then(stops => (
      dispatch({
        type: FETCH_STOPS_SUCCESS,
        payload: { search, stops },
      })
    ))
    .catch(() => (
      dispatch({
        type: FETCH_STOPS_ERROR,
        payload: new Error('Error al cargar paradas.'),
      })
    ));
};
