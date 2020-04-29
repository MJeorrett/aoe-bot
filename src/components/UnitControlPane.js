import React from 'react';

const UnitControlPane = ({
  unit,
}) => {
  return (
    <>
      <h3 style={{ marginTop: 0 }}>Unit: {unit.name}</h3>
      <pre>{JSON.stringify(unit, null, 2)}</pre>
    </>
  );
};

export default UnitControlPane;
