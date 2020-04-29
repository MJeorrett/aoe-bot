import { connect } from 'react-redux';

import { actions, selectors } from '../store';

import Action from './Action';

const mapStateToProps = () => {
  const selectActionById = selectors.actions.makeSelectActionById();
  const selectTimingById = selectors.timing.makeSelectOffsetAndDurationForAction();

  return (state, { id }) => ({
    action: selectActionById(state, id),
    timing: selectTimingById(state, id),
    selectedActionId: selectors.control.selectedActionId(state),
  });
};

const mapDispatchToProps = (dispatch, { id }) => ({
  select: () => dispatch(actions.control.setSelectedAction(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Action);
