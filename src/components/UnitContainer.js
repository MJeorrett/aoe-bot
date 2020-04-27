import { connect } from 'react-redux';

import { selectors, actions } from '../store';
import { createAction } from '../models/action';
import { createUnit } from '../models/unit';
import * as config from '../config';

import Unit from './Unit';

const mapStateToProps = () => {
  const selectUnitById = selectors.units.makeSelectById();
  const selectActionIdsForUnit = selectors.actions.makeSelectActionIdsForUnit();
  const selectTimingById = selectors.timing.makeSelectOffsetAndDurationForAction();
  
  return (state, { id }) => ({
    unit: selectUnitById(state, id),
    timing: selectTimingById(state, id),
    actionIds: selectActionIdsForUnit(state, id),
  });
};

const mapDispatchToProps = (dispatch, { id }) => ({
  addAction: (actionKey, prevActionId) => {
    const newAction = createAction(actionKey);
    dispatch(actions.actions.add(id, prevActionId, newAction));

    const producedUnitKey = config.actions[actionKey].produces;
    if (producedUnitKey) {
      const newUnit = createUnit(producedUnitKey);
      dispatch(actions.units.add(newUnit, newAction.id));
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Unit);
