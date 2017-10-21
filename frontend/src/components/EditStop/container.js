import { connect } from 'react-redux';
import EditStopComponent from './component';

import {
  createStop, updateStop, deleteStop, setActiveStop,
} from '../../actions';

const mapStateToProps = state => ({
  stop: state.stops.find((stop) => stop.id === state.active),
  isNew: state.active === 'new',
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onCancel: () => dispatch(setActiveStop(null)),
  onDelete: (id) => dispatch(deleteStop(id)),
  onSubmit: (data) => (
    data.id === 'new' ? dispatch(createStop(data)) : dispatch(updateStop(data))
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditStopComponent);
