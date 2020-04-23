import { connect } from 'react-redux';

import { actions, selectors } from '../store';

import Units from './Units';

const mapStateToProps = state => ({
  unitIds: selectors.units.allIds(state),
});

const mapDispatchToProps = {
  add: actions.units.add,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Units);
