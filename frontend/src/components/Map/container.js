import { connect } from 'react-redux';
import MapComponent from './component';
import { addStop, centerMap } from '../../actions';

const mapStateToProps = state => ({
  stops: state.stops,
  center: state.center,
  zoom: state.zoom,
  advancedSearchActive: state.advancedSearchActive,
  search: state.search,
  radius: parseInt(state.search && state.search.radiusInMeters, 10)
});

const mapDispatchToProps = dispatch => ({
  onClick: (evt) => {
    const { lat, lng } = evt.latlng;
    const data = { id: 'new', latitude: lat, longitude: lng };
    dispatch(addStop(data));
  },
  onMove: (evt) => {
    dispatch(centerMap(evt.target.getCenter(), evt.target.getZoom()))
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapComponent);
