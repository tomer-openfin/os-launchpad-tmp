import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { sendFeedback, SendFeedbackRequestPayload } from '../../redux/support';

import FeedbackFormik from './FeedbackFormik';

interface MapDispatch {
  handleSubmitValues: (payload: SendFeedbackRequestPayload['feedback']) => Promise<void>;
}

const mapDispatch = (dispatch: Dispatch, ownProps): MapDispatch => ({
  handleSubmitValues: (payload: SendFeedbackRequestPayload['feedback']) => {
    const { handleError, handleSuccess } = ownProps;

    return new Promise(resolve => {
      dispatch(
        sendFeedback.request(payload, {
          onFailure: () => {
            handleError();
            resolve();
          },
          onSuccess: () => {
            handleSuccess();
            resolve();
          },
        }),
      );
    });
  },
});

export default connect<null, MapDispatch>(
  null,
  mapDispatch,
)(FeedbackFormik);
