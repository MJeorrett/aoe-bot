import React from 'react';
import { connect } from 'react-redux';

import { actions, selectors } from '../store';

import ContinuousActionContainer from './ContinuousActionContainer';
import SimpleAction from './SimpleAction';

const mapStateToProps = () => {
  const selectActionById = selectors.actions.makeSelectActionById();
  const selectTimingById = selectors.timing.makeSelectOffsetAndDurationForAction();

  return (state, { id }) => ({
    action: selectActionById(state, id),
    timing: selectTimingById(state, id),
  });
};

const mapDispatchToProps = (dispatch, { id }) => ({
  remove: () => dispatch(actions.actions.remove(id)),
  select: () => dispatch(actions.control.setSelectedAction(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(({
  unitId,
  action,
  timing,
  remove,
  select,
}) => {
  // TODO: think we can remove unitId here.
  if (action.isContinuous) return (
    <ContinuousActionContainer
      key={action.id}
      unitId={unitId}
      action={action}
      remove={remove}
      select={select}
    />
  );
  return (
    <SimpleAction
      key={action.id}
      action={action}
      timing={timing}
      remove={remove}
      select={select}
    />
  );
});
