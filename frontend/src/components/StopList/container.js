import { connect } from 'react-redux';
import ListStopsComponent from './component';

const mapStateToProps = state => ({
  stops: state.stops
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListStopsComponent);
