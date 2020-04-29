import { connect } from 'react-redux';

import { selectors } from '../store';

import ControlPanel from './ControlPanel';

const mapStateToProps = state => ({
  selectedAction: selectors.control.selectedAction(state),
});

export default connect(
  mapStateToProps,
)(ControlPanel);
