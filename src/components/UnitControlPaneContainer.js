import { connect } from 'react-redux';

import { actions, selectors } from '../store';
import { createAction } from '../models/action';
import { createUnit } from '../models/unit';

import UnitControlPane from './UnitControlPane';

const mapStateToProps = () => {
  const selectUnitById = selectors.units.makeSelectById();
  const selectUnitTimingById = selectors.timing.makeSelectOffsetAndDurationForAction();
  const selectActionIdsForUnit = selectors.actions.makeSelectActionIdsForUnit();
  const selectActionTimingById = selectors.timing.makeSelectOffsetAndDurationForAction();
  
  return (state, { unitId }) => {
    const actionIds = selectActionIdsForUnit(state, unitId);
    const latestActionId = actionIds[actionIds.length - 1];
    return {
      unit: selectUnitById(state, unitId),
      unitTiming: selectUnitTimingById(state, unitId),
      actionIds,
      latestActionTiming: actionIds.length > 0 ? selectActionTimingById(state, latestActionId) : null,
    };
  };
};

const mapDispatchToProps = (dispatch, { unitId }) => ({
  addAction: (actionConfig, prevActionId, unitKey) => {
    const newAction = createAction(actionConfig);
    dispatch(actions.actions.add(unitId, prevActionId, newAction));

    if (actionConfig.produces) {
      const newUnit = createUnit(actionConfig.produces);
      dispatch(actions.units.add(newUnit, newAction.id));
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UnitControlPane);
