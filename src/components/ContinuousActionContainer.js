import { connect } from 'react-redux';

import { actions } from '../store';
import ContinuousAction from './ContinuousAction';

const mapDispatchToProps = (dispatch, { action: { id: actionId }, unitId }) => ({
  setTime: (newTime) => dispatch(actions.actions.setTime(actionId, unitId, newTime))
});

export default connect(
  null,
  mapDispatchToProps,
)(ContinuousAction);
