import { connect } from 'react-redux';

import { selectors } from '../store';

import ControlPanel from './ControlPanel';

const mapStateToProps = state => ({
  selectedActionId: selectors.control.selectedActionId(state),
});

export default connect(
  mapStateToProps
)(ControlPanel);
