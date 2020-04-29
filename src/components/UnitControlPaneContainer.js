import { connect } from 'react-redux';

import { actions, selectors } from '../store';
import { createAction } from '../models/action';
import { createUnit } from '../models/unit';

import UnitControlPane from './UnitControlPane';

const mapStateToProps = () => {
  const selectUnitById = selectors.units.makeSelectById();
  const selectActionIdsForUnit = selectors.actions.makeSelectActionIdsForUnit();
  
  return (state, { unitId }) => ({
    unit: selectUnitById(state, unitId),
    actionIds: selectActionIdsForUnit(state, unitId),
  });
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
