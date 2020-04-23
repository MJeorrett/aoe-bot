import { connect } from 'react-redux';

import { actions, selectors } from '../store';

import Units from './Units';

const mapStateToProps = state => ({
  units: selectors.units.all(state),
});

const mapDispatchToProps = {
  add: actions.units.add,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Units);
