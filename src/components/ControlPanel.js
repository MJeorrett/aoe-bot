import React from 'react';

import ActionControlPaneContainer from './ActionControlPaneContainer';
import UnitControlPaneContainer from './UnitControlPaneContainer';

const ControlPanel = ({
  selectedUnitId,
  selectedActionId,
}) => {
  if (selectedUnitId) {
    return <UnitControlPaneContainer unitId={selectedUnitId} />;
  }
  if (selectedActionId) {
    return <ActionControlPaneContainer actionId={selectedActionId} />;
  }

  return <p style={{ margin: 0 }}>Select a unit or action...</p>;
};

export default ControlPanel;
