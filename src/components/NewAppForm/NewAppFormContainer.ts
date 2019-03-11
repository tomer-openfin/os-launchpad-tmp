import { connect } from 'react-redux';

import { createAdminAppRequest } from '../../redux/admin';

import withEscapeKey from '../../hocs/withEscapeKey';
import NewAppForm from './NewAppForm';

const mapDispatch = {
  createApp: createAdminAppRequest,
};

const mergeProps = (_, dispatchProps, ownProps) => ({
  ...dispatchProps,
  ...ownProps,
  onEscDown: ownProps.handleCancel,
});

export default connect(
  null,
  mapDispatch,
  mergeProps,
)(withEscapeKey(NewAppForm));
