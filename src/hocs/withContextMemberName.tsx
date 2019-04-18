import * as React from 'react';
import { connect } from 'react-redux';

import { getSystemWindowIsPresent } from '../redux/system';
import { State } from '../redux/types';
import { Identity } from '../types/fin';
import { Subtract } from '../types/utils';
import { getOpenFinApplicationManifest, getWindowInfo } from '../utils/openfinPromises';

const INTERVAL_MS = 1500;

interface NameProp {
  name: string;
}

interface Props {
  identity: Identity;
  isHidden?: boolean;
  isPollingActive: boolean;
}

interface HocState {
  appName: string;
  isNotDefault: boolean;
  title: string;
}

type WithoutPassedProps<T> = Subtract<T, NameProp>;

const withContextMemberName = <P extends NameProp>(Component: React.ComponentType<P>) =>
  class ComponentWithContextMemberName extends React.Component<Props & WithoutPassedProps<P>, HocState> {
    interval?: number;

    state = {
      appName: '',
      isNotDefault: false,
      title: '',
    };

    componentDidMount() {
      const { isHidden, isPollingActive, identity } = this.props;

      this.getAndSetAppNameAndTitle(identity);

      if (isPollingActive && !isHidden) {
        this.setupInterval();
      }
    }

    componentWillUnmount() {
      this.teardownInterval();
    }

    componentDidUpdate(prevProps: Props) {
      if ((prevProps.isPollingActive && !this.props.isPollingActive) || (!prevProps.isHidden && this.props.isHidden)) {
        this.teardownInterval();
      }

      if ((!prevProps.isPollingActive && this.props.isPollingActive) || (prevProps.isHidden && !this.props.isHidden)) {
        this.getAndSetAppNameAndTitle(this.props.identity);

        this.setupInterval();
      }
    }

    handleInterval = () => {
      const { fin } = window;
      const { isPollingActive, identity } = this.props;

      if (!isPollingActive || !fin) {
        return;
      }

      this.getAndSetTitle(identity);
    };

    setupInterval = () => {
      this.teardownInterval();

      this.interval = window.setInterval(this.handleInterval, INTERVAL_MS);
    };

    teardownInterval = () => {
      clearInterval(this.interval);
    };

    getName = () => {
      const { isNotDefault, appName, title } = this.state;
      const { identity } = this.props;

      // Return an empty space so height of row doesn't shift from line height differences
      if (!isNotDefault) {
        return '\u00a0';
      }

      const windowName = title || identity.name;
      const displayAppName = appName || identity.uuid;
      return windowName ? `${windowName} / ${displayAppName}` : displayAppName;
    };

    getAndSetAppNameAndTitle = async (identity: Identity) => {
      const { uuid, name } = identity;
      if (!name) {
        return;
      }

      const finWindow = fin.desktop.Window.wrap(uuid, name);
      const [manifest, info] = await Promise.all([
        getOpenFinApplicationManifest(uuid)().catch(() => undefined),
        getWindowInfo(finWindow).catch(() => undefined),
      ]);

      const appName = typeof manifest === 'object' && manifest && manifest.startup_app ? manifest.startup_app.name : '';
      const title = typeof info === 'object' && info ? info.title : '';

      this.setState({ appName, isNotDefault: true, title });
    };

    getAndSetTitle = async (identity: Identity) => {
      const { uuid, name } = identity;
      if (!name) {
        return;
      }

      const finWindow = fin.desktop.Window.wrap(uuid, name);
      const info = await getWindowInfo(finWindow).catch(() => undefined);

      const title = typeof info === 'object' && info ? info.title : '';

      this.setState({ title });
    };

    render() {
      const { identity, isHidden, isPollingActive, ...props } = this.props;

      if (isHidden) {
        return null;
      }

      // TODO - remove any
      // tslint:disable-next-line:no-any
      return <Component {...props as any} name={this.getName()} />;
    }
  };

const mapState = (state: State, ownProps) => {
  const isPresent = getSystemWindowIsPresent(state, ownProps.identity);
  return {
    isHidden: !isPresent,
  };
};

export default Component => connect(mapState)(withContextMemberName(Component));
