import { connect } from 'react-redux';

import { actions, selectors } from '../store';

import Timeline from './Timeline';

const mapStateToProps = state => ({
  time: selectors.timeline.time(state),
});

const mapDispatchToProps = ({
  setTime: actions.timeline.setTime,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Timeline);
