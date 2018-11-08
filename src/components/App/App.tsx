import * as React from 'react';

import config from '../../config/windows';
import { App } from '../../redux/apps/types';
import { WindowConfig } from '../../redux/windows/types';

import * as ellipsis from '../../assets/Ellipsis.svg';
import * as gradient from '../../assets/gradient.svg';
import * as logo from '../../assets/Logo.svg';
import * as notifications from '../../assets/Notifications.svg';
import * as restoreLayout from '../../assets/RestoreLayout.svg';
import * as saveLayout from '../../assets/SaveLayout.svg';
import * as searchIcon from '../../assets/Search.svg';
import * as settings from '../../assets/Settings.svg';

import { Seperator, Wrapper } from './App.css';

import AppList from '../AppList';
import IconSpace from '../IconSpace';

interface Props {
  launcherPosition: string;
  launchWindowCreator: (window: WindowConfig) => () => void;
}

const App = ({ launchWindowCreator, launcherPosition }: Props) => (
  <Wrapper launcherPosition={launcherPosition}>
    <IconSpace iconImg={logo} />

    <Seperator />

    <IconSpace iconImg={searchIcon} onClick={launchWindowCreator(config.appDirectory)} hover />

    <Seperator />

    <AppList />

    <IconSpace iconImg={ellipsis} small hover />

    <Seperator />

    <IconSpace iconImg={saveLayout} hover />

    <IconSpace iconImg={restoreLayout} hover />

    <Seperator />

    <IconSpace iconImg={settings} hover />

    <Seperator />

    <IconSpace iconImg={notifications} hover />
  </Wrapper>
);

export default App;
