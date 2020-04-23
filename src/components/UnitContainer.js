import { connect } from 'react-redux';

import { selectors, actions } from '../store';
import { createAction } from '../models/action';

import Unit from './Unit';

const mapStateToProps = () => {
  const selectUnitById = selectors.units.makeSelectById();
  const selectActionsForUnit = selectors.actions.makeSelectActionsForUnit();
  
  return (state, { id }) => ({
    unit: selectUnitById(state, id),
    actions: selectActionsForUnit(state, id),
  });
};

const mapDispatchToProps = (dispatch, { id }) => ({
  addAction: (actionKey) => dispatch(actions.actions.add(id, createAction(actionKey))),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Unit);
