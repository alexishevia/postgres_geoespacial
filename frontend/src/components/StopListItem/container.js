import { connect } from 'react-redux';
import StopListItemComponent from './component';
import { setHighlightedStop, setActiveStop } from '../../actions';

const mapStateToProps = (state, ownProps) => ({
  isHighlighted: state.highlighted === ownProps.id
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onMouseEnter: () => dispatch(setHighlightedStop(ownProps.id)),
  onMouseLeave: () => dispatch(setHighlightedStop(null)),
  onClick: () => dispatch(setActiveStop(ownProps.id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StopListItemComponent);
