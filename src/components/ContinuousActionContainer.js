import { connect } from 'react-redux';

import { actions } from '../store';
import ContinuousAction from './ContinuousAction';

const mapDispatchToProps = (dispatch, { action: { id } }) => ({
  setTime: (newTime) => dispatch(actions.actions.setTime(id, newTime))
});

export default connect(
  null,
  mapDispatchToProps,
)(ContinuousAction);
