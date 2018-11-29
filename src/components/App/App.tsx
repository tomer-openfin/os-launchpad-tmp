import * as React from 'react';

import * as adminIcon from '../../assets/AdminSettings.svg';
import * as notificationsIcon from '../../assets/Notifications.svg';
import * as saveLayoutIcon from '../../assets/SaveLayout.svg';
import * as searchIcon from '../../assets/Search.svg';
import * as settingsIcon from '../../assets/Settings.svg';

import windowsConfig from '../../config/windows';
import { WindowConfig } from '../../redux/windows/types';

import { LauncherPosition } from '../../types/commons';
import AppList from '../AppList';
import IconSpace from '../IconSpace';
import Logo from '../Logo';
import { EllipsisImage, EllipsisWrapper, Separator, Wrapper } from './App.css';

export interface Props {
  isAdmin?: boolean;
  launcherPosition: LauncherPosition;
  launchWindow: (window: WindowConfig) => void;
}

const App = (props: Props) => {
  const { isAdmin, launcherPosition, launchWindow } = props;

  const handleLaunchAdminWindow = () => launchWindow(windowsConfig.admin);
  const handleLaunchAppDirectoryWindow = () => launchWindow(windowsConfig.appDirectory);
  const handleLaunchAppOverflowWindow = () => launchWindow(windowsConfig.appLauncherOverflow);
  const handleLaunchSettingsWindow = () => launchWindow(windowsConfig.settings);
  const handleLaunchLayoutsWindow = () => launchWindow(windowsConfig.layouts);

  return (
    <Wrapper launcherPosition={launcherPosition}>
      <Logo />

      <Separator launcherPosition={launcherPosition} />

      <AppList spaceCount={4} />

      <EllipsisWrapper launcherPosition={launcherPosition} onClick={handleLaunchAppOverflowWindow}>
        <EllipsisImage launcherPosition={launcherPosition} />
      </EllipsisWrapper>

      <Separator launcherPosition={launcherPosition} />

      {isAdmin && (
        <>
          <IconSpace hover iconImg={adminIcon} onClick={handleLaunchAdminWindow} />

          <Separator launcherPosition={launcherPosition} />
        </>
      )}

      <IconSpace hover iconImg={settingsIcon} onClick={handleLaunchSettingsWindow} />

      <Separator launcherPosition={launcherPosition} />

      <IconSpace hover iconImg={searchIcon} onClick={handleLaunchAppDirectoryWindow} />

      <Separator launcherPosition={launcherPosition} />

      <IconSpace hover iconImg={saveLayoutIcon} onClick={handleLaunchLayoutsWindow} />

      <Separator launcherPosition={launcherPosition} />

      <IconSpace hover iconImg={notificationsIcon} />
    </Wrapper>
  );
};

export default App;
