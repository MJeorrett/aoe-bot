import { connect } from 'react-redux';

import { selectors, actions } from '../store';

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
  select: () => dispatch(actions.control.setSelectedUnit(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Unit);
