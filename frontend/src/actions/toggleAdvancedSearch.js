import { TOGGLE_ADVANCED_SEARCH } from '../actionTypes';
import fetchStops from './fetchStops';

/*
 * Toggle advanced search between active and inactive
 */
export default () => (dispatch) => {
  dispatch({ type: TOGGLE_ADVANCED_SEARCH });
  dispatch(fetchStops());
}
