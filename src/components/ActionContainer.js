import React from 'react';
import { connect } from 'react-redux';

import { placeholderActionType } from '../models/action';
import { actions, selectors } from '../store';

import ContinuousActionContainer from './ContinuousActionContainer';
import PlaceholderAction from './PlaceholderAction';
import SimpleAction from './SimpleAction';

const mapStateToProps = () => {
  const selectActionById = selectors.actions.makeSelectActionById();

  return (state, { id }) => ({
    action: selectActionById(state, id),
  });
};

const mapDispatchToProps = (dispatch, { id }) => ({
  remove: () => dispatch(actions.actions.remove(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(({
  unitId,
  action,
  remove,
}) => {
  if (action.type === placeholderActionType) return <PlaceholderAction action={action} />;
  // TODO: think we can remove unitId here.
  if (action.isContinuous) return <ContinuousActionContainer key={action.id} unitId={unitId} action={action} remove={remove} />;
  return <SimpleAction key={action.id} action={action} remove={remove} />;
});
