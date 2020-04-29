import { connect } from 'react-redux';

import { selectors } from '../store';

import ActionSelector from './ActionSelector';

const mapStateToProps = (state, { timeOffset }) => {
  const resourcesByTime = selectors.meta.resourcesByTime(state);

  return {
    currentResources: resourcesByTime[timeOffset],
  };
};

export default connect(
  mapStateToProps,
)(ActionSelector);
