import * as React from 'react';

import { LoginErrorPayload } from '../../redux/me/types';

import Borders from '../Borders';
import ChangePasswordForm from '../ChangePasswordForm';
import LoginForm from '../LoginForm';
import Logo from '../Logo';
import WindowHeader from '../WindowHeader';
import { ContentWrapper, FormWrapper, LogoWrapper, ResponseMessage, Wrapper } from './Login.css';

export enum Stage {
  ChangePassword = 'changePassword',
  Login = 'login',
}

interface Props {
  className?: string;
  closeApplication: () => void;
  error: boolean;
  isTabDisabled?: boolean;
  message: string;
}

interface State {
  session: string;
  stage: Stage;
  username: string;
}

interface ViewProps extends Props, State {
  handleError: (payload: LoginErrorPayload) => void;
}

const craftMessage = (error: boolean, message: string, stage: Stage): string => {
  if (stage === Stage.Login && error) {
    return 'Login failed. Please try again.';
  }

  return message;
};

export const LoginView = (props: ViewProps) => {
  const { className, closeApplication, handleError, isTabDisabled, error, message, session, stage, username } = props;

  return (
    <Wrapper className={className}>
      <Borders borderRadius="6px">
        <WindowHeader handleClose={closeApplication} label="LogIn">
          Log In
        </WindowHeader>

        <ContentWrapper>
          <LogoWrapper>
            <Logo orgImageKey="loginLogo" size={90} />
          </LogoWrapper>

          <FormWrapper>
            {stage === Stage.ChangePassword ? (
              <ChangePasswordForm errorCb={handleError} session={session} username={username} />
            ) : (
              <LoginForm errorCb={handleError} isTabDisabled={isTabDisabled} />
            )}
          </FormWrapper>

          {message && <ResponseMessage error={error}>{craftMessage(error, message, stage)}</ResponseMessage>}
        </ContentWrapper>
      </Borders>
    </Wrapper>
  );
};

class Login extends React.Component<Props, State> {
  state = {
    session: '',
    stage: Stage.Login,
    username: '',
  };

  handleError = (payload: LoginErrorPayload) => {
    const code = payload.code || '';
    if (code === 'NewPasswordRequired') {
      this.setState({
        session: payload.session || '',
        stage: Stage.ChangePassword,
        username: payload.username,
      });
    } else {
      this.setState({
        session: payload.session || '',
      });
    }
  };

  render() {
    return <LoginView {...this.props} {...this.state} handleError={this.handleError} />;
  }
}

export default Login;
