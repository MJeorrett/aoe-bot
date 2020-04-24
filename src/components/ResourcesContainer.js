import { connect } from 'react-redux';

import { selectors } from '../store';

import Resources from './Resources';

const mapStateToProps = state => ({
  resourcesByTime: selectors.meta.resourcesByTime(state),
  time: selectors.timeline.previewTime(state) || selectors.timeline.time(state),
});

export default connect(
  mapStateToProps,
)(Resources);
