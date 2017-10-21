import { CENTER_MAP } from '../actionTypes';
import fetchStops from './fetchStops';

/*
 * Center map in the given point, with the given zoom.
 *
*/
export default (center, zoom) => (dispatch) => {
  dispatch({
    type: CENTER_MAP,
    payload: { center, zoom },
  });
  dispatch(fetchStops());
}
