import { connect } from 'react-redux';

import { actions, selectors } from '../store';

import Timeline from './Timeline';

const mapStateToProps = state => ({
  time: selectors.timeline.time(state),
});

const mapDispatchToProps = ({
  setTime: actions.timeline.setTime,
  setPreviewTime: actions.timeline.setPreviewTime,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Timeline);
