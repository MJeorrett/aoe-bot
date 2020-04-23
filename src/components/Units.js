import React from 'react';

import Unit from './Unit';

const Units = ({
  units,
}) => {
  return (
    units.map(u => (
      <Unit key={u.id} title={u.name} />
    ))
  );
};

export default Units;
