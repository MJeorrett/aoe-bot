import React from 'react';

import UnitContainer from './UnitContainer';

const Units = ({
  unitIds,
}) => {
  return (
    unitIds.map(id => (
      <UnitContainer key={id} id={id} />
    ))
  );
};

export default Units;
