import { connect } from 'react-redux';

import { actions, selectors } from '../store';
import ContinuousAction from './ContinuousAction';

const mapStateToProps = () => {
  const selectTime = selectors.actions.makeSelectTimeById();

  return (state, { action, action: { id } }) => ({
    action: {
      ...action,
      time: selectTime(state, id),
    }
  });
};

const mapDispatchToProps = (dispatch, { action: { id } }) => ({
  setTime: (newTime) => dispatch(actions.actions.setTime(id, newTime))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContinuousAction);
