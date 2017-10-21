import { connect } from 'react-redux';
import { updateSearch, toggleAdvancedSearch } from '../../actions';
import SearchComponent from './component';

const mapStateToProps = state => ({
  search: state.search,
  center: state.center,
  advancedSearchActive: state.advancedSearchActive,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateSearch: (values) => dispatch(updateSearch(values)),
  toggleAdvancedSearch: () => dispatch(toggleAdvancedSearch()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchComponent);
