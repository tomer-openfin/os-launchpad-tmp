import throttle = require('lodash.throttle');
import * as React from 'react';

import * as AdminIcon from '../../assets/AdminSettings.svg';
import * as logo from '../../assets/Logo.svg';
import * as notifications from '../../assets/Notifications.svg';
import * as restoreLayout from '../../assets/RestoreLayout.svg';
import * as saveLayout from '../../assets/SaveLayout.svg';
import * as searchIcon from '../../assets/Search.svg';
import * as Settings from '../../assets/Settings.svg';

import config from '../../config/windows';
import { Bounds } from '../../redux/types';
import { WindowConfig } from '../../redux/windows/types';
import { isPosInBounds } from '../../utils/coordinateHelpers';

import AppList from '../AppList';
import IconSpace from '../IconSpace';
import { Ellipsis, Separator, Wrapper } from './App.css';

interface Props {
  autoHide: boolean;
  bounds: Bounds;
  collapseApp: () => void;
  expandApp: () => void;
  isExpanded: boolean;
  launcherPosition: string;
  launchWindowCreator: (window: WindowConfig) => () => void;
  monitorInfo: object;
  setMonitorInfo: (monitorInfo: object) => void;
  saveCurrentLayout: Function;
  restoreCurrentLayout: Function;
}

// TODO - move to an HOC
class App extends React.PureComponent<Props> {
  interval?: number;

  constructor(props: Props) {
    super(props);

    this.handleMouseEnterOnWindow = throttle(this.handleMouseEnterOnWindow.bind(this), 225, { leading: true, trailing: false });
    this.handleMouseLeaveOnWindow = throttle(this.handleMouseLeaveOnWindow.bind(this), 225, { leading: true, trailing: false });
  }

  componentDidMount() {
    this.bindMouseEvents();
  }

  componentWillUnmount() {
    this.unbindMouseEvents();
  }

  bindMouseEvents = () => {
    if (!this.props.autoHide) {
      return;
    }

    this.interval = window.setInterval(this.handleInterval, 250);
    window.addEventListener('mouseover', this.handleMouseEnterOnWindow);
  };

  unbindMouseEvents = () => {
    this.clearInterval();
    window.removeEventListener('mouseover', this.handleMouseEnterOnWindow);
  };

  clearInterval = () => {
    if (this.interval) {
      clearInterval(this.interval);
    }
  };

  handleInterval = () => {
    const { fin } = window;
    const { bounds, isExpanded } = this.props;

    if (!fin || !isExpanded) {
      return;
    }

    fin.desktop.System.getMousePosition(pos => {
      if (!isPosInBounds(pos, bounds)) {
        this.handleMouseLeaveOnWindow();
      }
    });
  };

  handleMouseEnterOnWindow() {
    if (!this.props.isExpanded) {
      this.props.expandApp();
    }
  }

  handleMouseLeaveOnWindow() {
    if (this.props.isExpanded) {
      this.props.collapseApp();
    }
  }

  render() {
    const { launchWindowCreator, launcherPosition, saveCurrentLayout, restoreCurrentLayout } = this.props;

    return (
      <Wrapper launcherPosition={launcherPosition}>
        <IconSpace iconImg={logo} />

        <Separator launcherPosition={launcherPosition} />

        <IconSpace iconImg={searchIcon} onClick={launchWindowCreator(config.appDirectory)} hover />

        <Separator launcherPosition={launcherPosition} />

        <AppList spaceCount={4} />

        <Ellipsis onClick={launchWindowCreator(config.appLauncherOverflow)} launcherPosition={launcherPosition} />

        <Separator launcherPosition={launcherPosition} />

        <IconSpace iconImg={AdminIcon} hover />

        <Separator launcherPosition={launcherPosition} />

        <IconSpace iconImg={Settings} hover />

        <Separator launcherPosition={launcherPosition} />

        <IconSpace iconImg={saveLayout} onClick={() => saveCurrentLayout()} hover />

        <IconSpace iconImg={restoreLayout} onClick={() => restoreCurrentLayout()} hover />

        <Separator launcherPosition={launcherPosition} />

        <IconSpace iconImg={notifications} hover />
      </Wrapper>
    );
  }
}

export default App;
