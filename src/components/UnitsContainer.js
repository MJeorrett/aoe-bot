import React from 'react';
import { connect } from 'react-redux';

import { actions, selectors } from '../store';

import Unit from './Unit';

const mapStateToProps = state => ({
  units: selectors.units.all(state),
});

const mapDispatchToProps = {
  add: actions.units.add,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(({ units }) => {
  return (
    units.map(u => (
      <Unit key={u.id} title={u.name} />
    ))
  );
});
