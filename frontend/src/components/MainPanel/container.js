import { connect } from 'react-redux';
import MainPanelComponent from './component';

const mapStateToProps = state => ({
  hasActiveStop: !!state.active,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainPanelComponent);
