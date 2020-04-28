import { connect } from 'react-redux';

import { selectors, actions } from '../store';
import { createAction } from '../models/action';
import { createUnit } from '../models/unit';

import Unit from './Unit';

const mapStateToProps = () => {
  const selectUnitById = selectors.units.makeSelectById();
  const selectParentActionId = selectors.units.makeSelectParentActionIdById();
  const selectActionIdsForUnit = selectors.actions.makeSelectActionIdsForUnit();
  const selectTimingById = selectors.timing.makeSelectOffsetAndDurationForAction();
  
  return (state, { id }) => ({
    unit: selectUnitById(state, id),
    parentActionId: selectParentActionId(state, id),
    timing: selectTimingById(state, id),
    actionIds: selectActionIdsForUnit(state, id),
  });
};

const mapDispatchToProps = (dispatch, { id }) => ({
  addAction: (actionConfig, prevActionId, unitKey) => {
    const newAction = createAction(actionConfig);
    dispatch(actions.actions.add(id, prevActionId, newAction));

    if (actionConfig.produces) {
      const newUnit = createUnit(actionConfig.produces);
      dispatch(actions.units.add(newUnit, newAction.id));
    }
  },
  deleteUnit: () => dispatch(actions.units.remove(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Unit);
