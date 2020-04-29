import { connect } from 'react-redux';

import { actions, selectors } from '../store';

import ControlPanel from './ControlPanel';

const mapStateToProps = state => ({
  selectedAction: selectors.control.selectedAction(state),
  selectedActionTiming: selectors.control.selectedActionTiming(state),
});

const mapDispatchToProps = ({
  setActionDuration: actions.actions.setTime,
  deleteAction: actions.actions.remove,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ControlPanel);
