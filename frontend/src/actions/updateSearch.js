import { UPDATE_SEARCH } from '../actionTypes';
import fetchStops from './fetchStops';

/*
 * Update search params
 */
export default (searchParams = {}) => (dispatch) => {
  dispatch({
    type: UPDATE_SEARCH,
    payload: searchParams,
  });
  dispatch(fetchStops());
};
