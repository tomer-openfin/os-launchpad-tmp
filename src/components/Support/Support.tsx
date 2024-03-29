import * as React from 'react';

import { BigButtonWrapper, StyledButton, Wrapper } from './Support.css';

import Borders from '../Borders';
import BugForm from '../BugForm';
import FeedbackForm from '../FeedbackForm';
import SupportFormConfirmation, { BugError, BugSuccess, FeedbackError, FeedbackSuccess } from '../SupportFormConfirmation';
import WindowHeader from '../WindowHeader';

export const BUG_HEADER = 'Report a Bug';
export const FEEDBACK_HEADER = 'Provide Feedback';
export const CONTACT_HEADER = 'Contact Support';

export enum Type {
  Default = 'default',
  Bug = 'bug',
  Feedback = 'feedback',
}

export enum Stage {
  Default = 'default',
  Success = 'success',
  Failure = 'failure',
}

interface Props {
  handleClose: () => void;
}

interface ViewProps extends Props, State {
  handleError: () => void;
  handleReset: () => void;
  handleSuccess: () => void;
  setType: (type: Type) => void;
}

interface State {
  type: Type;
  stage: Stage;
}

const headerTitles = {
  [Type.Default]: CONTACT_HEADER,
  [Type.Bug]: BUG_HEADER,
  [Type.Feedback]: FEEDBACK_HEADER,
};

export const SupportView = (props: ViewProps) => {
  const { handleClose, handleError, handleReset, handleSuccess, setType, stage, type } = props;

  const createHandleType = (nextType: Type) => () => setType(nextType);

  const handleCloseAndReset = () => {
    handleReset();
    handleClose();
  };

  return (
    <Wrapper>
      <Borders height="100%" width="100%">
        <WindowHeader handleBack={type !== Type.Default ? handleReset : undefined} handleClose={handleCloseAndReset} label="Support">
          {headerTitles[props.type]}
        </WindowHeader>

        {stage === Stage.Default && type === Type.Default && (
          <BigButtonWrapper>
            <StyledButton onClick={createHandleType(Type.Feedback)} width={161}>
              Submit Feedback
            </StyledButton>

            <StyledButton onClick={createHandleType(Type.Bug)} width={161}>
              Report a Bug
            </StyledButton>
          </BigButtonWrapper>
        )}

        {stage === Stage.Default && type === Type.Feedback && <FeedbackForm handleSuccess={handleSuccess} handleError={handleError} />}

        {stage === Stage.Default && type === Type.Bug && <BugForm handleSuccess={handleSuccess} handleError={handleError} />}

        {stage === Stage.Success && type === Type.Bug && (
          <SupportFormConfirmation handleClose={handleReset}>
            <BugSuccess />
          </SupportFormConfirmation>
        )}

        {stage === Stage.Success && type === Type.Feedback && (
          <SupportFormConfirmation handleClose={handleReset}>
            <FeedbackSuccess />
          </SupportFormConfirmation>
        )}

        {stage === Stage.Failure && type === Type.Bug && (
          <SupportFormConfirmation handleClose={handleReset}>
            <BugError />
          </SupportFormConfirmation>
        )}

        {stage === Stage.Failure && type === Type.Feedback && (
          <SupportFormConfirmation handleClose={handleReset}>
            <FeedbackError />
          </SupportFormConfirmation>
        )}
      </Borders>
    </Wrapper>
  );
};

class Support extends React.Component<Props, State> {
  state = {
    stage: Stage.Default,
    type: Type.Default,
  };

  setType = (type: Type) => {
    this.setState({ type });
  };

  handleError = () => {
    this.setState({ stage: Stage.Failure });
  };

  handleSuccess = () => {
    this.setState({ stage: Stage.Success });
  };

  handleReset = () => {
    this.setState({ stage: Stage.Default, type: Type.Default });
  };

  render() {
    return (
      <SupportView
        {...this.props}
        {...this.state}
        handleError={this.handleError}
        handleReset={this.handleReset}
        handleSuccess={this.handleSuccess}
        setType={this.setType}
      />
    );
  }
}

export default Support;
