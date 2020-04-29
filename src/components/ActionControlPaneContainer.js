import { connect } from 'react-redux';

import { actions, selectors } from '../store';

import ActionControlPane from './ActionControlPane';

const mapStateToProps = () => {
  const selectActionById = selectors.actions.makeSelectActionById();
  const selectTimingById = selectors.timing.makeSelectOffsetAndDurationForAction();

  return (state, { actionId }) => ({
    action: selectActionById(state, actionId),
    actionTiming: selectTimingById(state, actionId),
  });
};

const mapDispatchToProps = (dispatch, { actionId }) => ({
  setActionDuration: newTime => dispatch(actions.actions.setTime(actionId, newTime)),
  deleteAction: () => dispatch(actions.actions.remove(actionId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActionControlPane);
