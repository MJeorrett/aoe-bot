import React from 'react';

import ActionControlPaneContainer from './ActionControlPaneContainer';

const ControlPanel = ({
  selectedActionId,
}) => {
  return (
    <div style={{
      border: '1px solid dodgerblue',
      minWidth: '200px',
      padding: '1em',
    }}>
      {selectedActionId ?
        <ActionControlPaneContainer actionId={selectedActionId} /> :
        <p style={{ margin: 0 }}>Select an action...</p>}
    </div>
  );
};

export default ControlPanel;
