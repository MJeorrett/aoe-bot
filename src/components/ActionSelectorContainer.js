import { connect } from 'react-redux';

import { selectors } from '../store';

import ActionSelector from './ActionSelector';

const mapStateToProps = state => ({
  resourcesByTime: selectors.meta.resourcesByTime(state),
});

export default connect(
  mapStateToProps,
)(ActionSelector);
