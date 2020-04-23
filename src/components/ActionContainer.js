import React from 'react';
import { connect } from 'react-redux';

import { placeholderActionType } from '../models/action';
import { selectors } from '../store';

import ContinuousActionContainer from './ContinuousActionContainer';
import PlaceholderAction from './PlaceholderAction';
import SimpleAction from './SimpleAction';

const mapStateToProps = () => {
  const selectActionById = selectors.actions.makeSelectActionById();

  return (state, { id }) => ({
    action: selectActionById(state, id),
  });
};

export default connect(
  mapStateToProps,
)(({
  action,
}) => {
  if (action.type === placeholderActionType) return <PlaceholderAction action={action} />;
  if (action.isContinuous) return <ContinuousActionContainer key={action.id} action={action} />;
  return <SimpleAction key={action.id} action={action} />;
});
