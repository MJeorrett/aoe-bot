import { connect } from 'react-redux';

import { selectors } from '../store';

import UnitControlPane from './UnitControlPane';

const mapStateToProps = () => {
  const selectUnitById = selectors.units.makeSelectById();
  const selectParentActionId = selectors.units.makeSelectParentActionIdById();
  const selectTimingById = selectors.timing.makeSelectOffsetAndDurationForAction();
  
  return (state, { unitId }) => ({
    unit: selectUnitById(state, unitId),
    parentActionId: selectParentActionId(state, unitId),
    timing: selectTimingById(state, unitId),
  });
};

export default connect(
  mapStateToProps,
)(UnitControlPane);
