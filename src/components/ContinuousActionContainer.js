import { connect } from 'react-redux';

import { actions } from '../store';
import ContinuousAction from './ContinuousAction';

const mapDispatchToProps = (dispatch, { action: { id: actionId } }) => ({
  setTime: (newTime) => dispatch(actions.actions.setTime(actionId, newTime))
});

export default connect(
  null,
  mapDispatchToProps,
)(ContinuousAction);
