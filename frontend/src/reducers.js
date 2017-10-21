import {notify} from 'react-notify-toast';
import {
  CENTER_MAP,
  UPDATE_SEARCH,
  TOGGLE_ADVANCED_SEARCH,
  SET_HIGHLIGHTED_STOP,
  SET_ACTIVE_STOP,
  ADD_STOP,
  REMOVE_STOP,
  FETCH_STOPS_SUCCESS, FETCH_STOPS_ERROR,
  CREATE_STOP_SUCCESS, CREATE_STOP_ERROR,
  UPDATE_STOP_SUCCESS, UPDATE_STOP_ERROR,
  DELETE_STOP_SUCCESS, DELETE_STOP_ERROR,
} from './actionTypes';

const initialState = {
  center: { lat: 8.99, lng: -79.52 }, // Panama City
  zoom: 14,
  stops: [],
  search: {
    text: null,
    radiusInMeters: 1000,
  },
  highlighted: null,
  active: null,
  advancedSearchActive: false,
};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch(type) {

    case CENTER_MAP:
      return Object.assign({}, state, {
        center: payload.center || state.center,
        zoom: payload.zoom || state.zoom,
      });

    case UPDATE_SEARCH:
      return Object.assign({}, state, {
        search: Object.assign({}, state.search, payload),
      });

    case TOGGLE_ADVANCED_SEARCH:
      return Object.assign({}, state, {
        advancedSearchActive: !state.advancedSearchActive,
      });

    case FETCH_STOPS_SUCCESS:
      // only update stops if the current `search` value matches the `search`
      // value used when fetching the stops
      if (payload.search === state.search) {
        return Object.assign({}, state, {
          stops: [
            state.stops.find(stop => stop.id === 'new'),
            ...payload.stops,
          ].filter(s => s)
        });
      }
      return state;

    case SET_HIGHLIGHTED_STOP:
      return Object.assign({}, state, {
        highlighted: payload.id
      });

    case SET_ACTIVE_STOP:
      const stop = state.stops.find(s => s.id === payload.id) || {};
      return Object.assign({}, state, {
        active: payload.id,
        center: {
          lat: stop.latitude || state.center.lat,
          lng: stop.longitude || state.center.lng,
        },
      });

    case REMOVE_STOP:
      return Object.assign({}, state, {
        active: (state.active === payload.id) ? null : state.active,
        highlighted: (state.highlighted === payload.id) ? null : state.highlighted,
        stops: state.stops.filter(stop => stop.id !== payload.id)
      });

    case ADD_STOP:
      return Object.assign({}, state, {
        active: payload.id,
        stops: [
          payload,
          ...state.stops.filter(stop => stop.id !== payload.id)
        ],
        center: { lat: payload.latitude, lng: payload.longitude },
      });

    case CREATE_STOP_SUCCESS:
      notify.show('Parada creada correctamente.', 'success');
      return state;

    case UPDATE_STOP_SUCCESS:
      notify.show('Parada actualizada correctamente.', 'success');
      return state;

    case DELETE_STOP_SUCCESS:
      notify.show('Parada eliminada correctamente.', 'success');
      return state;

    case FETCH_STOPS_ERROR:
    case CREATE_STOP_ERROR:
    case UPDATE_STOP_ERROR:
    case DELETE_STOP_ERROR:
      notify.show(payload.message, 'error');
      return state;

    default:
      return state;
  }
};
