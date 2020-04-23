import { connect } from 'react-redux';

import { selectors, actions } from '../store';
import { createAction, createPlaceholderAction } from '../models/action';
import { createUnit } from '../models/unit';
import * as config from '../config';

import Unit from './Unit';

const mapStateToProps = () => {
  const selectUnitById = selectors.units.makeSelectById();
  const selectActionsForUnit = selectors.actions.makeSelectActionsForUnit();
  
  return (state, { id }) => ({
    unit: selectUnitById(state, id),
    // TODO: Should be actionIds
    actions: selectActionsForUnit(state, id),
  });
};

const mapDispatchToProps = (dispatch, { id }) => ({
  addAction: (actionKey) => {
    const newAction = createAction(actionKey);
    dispatch(actions.actions.add(id, newAction));

    const producedUnitKey = config.actions[actionKey].produces;
    if (producedUnitKey) {
      const newUnit = createUnit(producedUnitKey, newAction.id);
      dispatch(actions.units.add(newUnit));
      const placeholderAction = createPlaceholderAction(newAction.id);
      dispatch(actions.actions.add(newUnit.id, placeholderAction));
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Unit);
