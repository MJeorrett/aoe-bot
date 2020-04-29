import React from 'react';

import ActionControlPaneContainer from './ActionControlPaneContainer';
import UnitControlPaneContainer from './UnitControlPaneContainer';

const ControlPanel = ({
  selectedUnitId,
  selectedActionId,
}) => {
  const renderContents = () => {
    if (selectedUnitId) {
      return <UnitControlPaneContainer unitId={selectedUnitId} />;
    }
    if (selectedActionId) {
      return <ActionControlPaneContainer actionId={selectedActionId} />;
    }
    
    return <p style={{ margin: 0 }}>Select a unit or action...</p>;
  };

  return (
    <div style={{
      border: '1px solid dodgerblue',
      minWidth: '200px',
      padding: '1em',
    }}>
      {renderContents()}
    </div>
  );
};

export default ControlPanel;
