import { connect } from 'react-redux';

import { selectors } from '../store';

import Resources from './Resources';

const mapStateToProps = state => {
  const previewTime = selectors.timeline.previewTime(state);
  const time = selectors.timeline.time(state);

  return {
    resourcesByTime: selectors.meta.resourcesByTime(state),
    time: previewTime < 0 ? time : previewTime,
  };
};

export default connect(
  mapStateToProps,
)(Resources);
