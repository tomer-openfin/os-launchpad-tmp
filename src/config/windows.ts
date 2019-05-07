import { ROUTES } from '../components/Router/consts';
import { isProductionEnv } from '../utils/processHelpers';

const WINDOW_PREFIX = 'osLaunchpad';

export const ADMIN_WINDOW = `${WINDOW_PREFIX}Admin`;
export const APP_DIRECTORY_WINDOW = `${WINDOW_PREFIX}AppDirectory`;
export const APP_LAUNCHER_OVERFLOW_WINDOW = `${WINDOW_PREFIX}AppLauncherOverflow`;
export const CHANNELS_WINDOW = `${WINDOW_PREFIX}Channels`;
export const CHANNELS_CONTEXT_WINDOW = `${WINDOW_PREFIX}ChannelsContext`;
export const CONTEXT_MENU = `${WINDOW_PREFIX}ContextMenu`;
export const LAYOUTS_WINDOW = `${WINDOW_PREFIX}Layouts`;
export const LOGIN_WINDOW = `${WINDOW_PREFIX}Login`;
export const SETTINGS_WINDOW = `${WINDOW_PREFIX}Settings`;
export const SETTINGS_MENU_WINDOW = `${WINDOW_PREFIX}SettingsMenu`;
export const SNAPSHOT_WINDOW = `${WINDOW_PREFIX}Snapshot`;
export const SNAPSHOT_OVERLAY_WINDOW = `${WINDOW_PREFIX}SnapshotOverlay`;
export const SUPPORT_WINDOW = `${WINDOW_PREFIX}Support`;
export const PREVIEW_WINDOW = `${WINDOW_PREFIX}Preview`;

const isProduction = isProductionEnv();

export const defaultWindows = {
  appDirectory: {
    alwaysOnTop: true,
    autoShow: false,
    contextMenu: !isProduction,
    defaultCentered: true,
    defaultHeight: 542,
    defaultWidth: 510,
    frame: false,
    id: APP_DIRECTORY_WINDOW,
    maxHeight: -1,
    maximizable: false,
    minHeight: 0,
    minWidth: 0,
    minimizable: false,
    name: APP_DIRECTORY_WINDOW,
    resizable: false,
    saveWindowState: false,
    shadow: true,
    showTaskbarIcon: true,
    url: ROUTES.APP_DIRECTORY,
    waitForPageLoad: true,
  },
  appLauncherOverflow: {
    alwaysOnTop: true,
    autoShow: true,
    contextMenu: !isProduction,
    defaultCentered: false,
    defaultHeight: 300,
    defaultLeft: -999999,
    defaultTop: -999999,
    defaultWidth: 200,
    frame: false,
    id: APP_LAUNCHER_OVERFLOW_WINDOW,
    maxHeight: -1,
    maximizable: false,
    minHeight: 0,
    minWidth: 0,
    minimizable: false,
    name: APP_LAUNCHER_OVERFLOW_WINDOW,
    opacity: 0,
    resizable: false,
    saveWindowState: false,
    showTaskbarIcon: false,
    url: ROUTES.APP_LAUNCHER_OVERFLOW,
    waitForPageLoad: true,
  },
  channels: {
    alwaysOnTop: false,
    autoShow: false,
    contextMenu: !isProduction,
    defaultCentered: true,
    defaultHeight: 288,
    defaultWidth: 368,
    frame: false,
    id: CHANNELS_WINDOW,
    maxHeight: -1,
    maximizable: false,
    minHeight: 0,
    minWidth: 0,
    minimizable: false,
    name: CHANNELS_WINDOW,
    resizable: false,
    saveWindowState: false,
    shadow: true,
    showTaskbarIcon: true,
    url: ROUTES.CHANNELS,
    waitForPageLoad: true,
  },
  contextMenu: {
    alwaysOnTop: true,
    autoShow: false,
    contextMenu: !isProduction,
    defaultCentered: true,
    defaultHeight: 30,
    defaultWidth: 80,
    frame: false,
    id: CONTEXT_MENU,
    maxHeight: -1,
    maximizable: false,
    minHeight: 0,
    minWidth: 0,
    minimizable: false,
    name: CONTEXT_MENU,
    resizable: false,
    saveWindowState: false,
    shadow: true,
    showTaskbarIcon: false,
    url: ROUTES.CONTEXT_MENU,
    waitForPageLoad: true,
  },
  layouts: {
    alwaysOnTop: true,
    autoShow: false,
    contextMenu: !isProduction,
    cornerRounding: {
      height: 8,
      width: 8,
    },
    defaultCentered: false,
    defaultHeight: 213,
    defaultWidth: 171,
    frame: false,
    id: LAYOUTS_WINDOW,
    maxHeight: -1,
    maximizable: false,
    minHeight: 0,
    minWidth: 0,
    minimizable: false,
    name: LAYOUTS_WINDOW,
    resizable: false,
    saveWindowState: false,
    showTaskbarIcon: false,
    url: ROUTES.LAYOUTS,
    waitForPageLoad: true,
  },
  settings: {
    alwaysOnTop: false,
    autoShow: false,
    contextMenu: !isProduction,
    defaultCentered: true,
    defaultHeight: 478,
    defaultWidth: 510,
    frame: false,
    id: SETTINGS_WINDOW,
    maxHeight: -1,
    maximizable: false,
    minHeight: 0,
    minWidth: 0,
    minimizable: false,
    name: SETTINGS_WINDOW,
    resizable: false,
    saveWindowState: false,
    shadow: true,
    showTaskbarIcon: true,
    url: ROUTES.SETTINGS,
    waitForPageLoad: true,
  },
  settingsMenu: {
    alwaysOnTop: true,
    autoShow: false,
    contextMenu: !isProduction,
    cornerRounding: {
      height: 8,
      width: 8,
    },
    defaultCentered: false,
    defaultHeight: 148,
    defaultWidth: 184,
    frame: false,
    id: SETTINGS_MENU_WINDOW,
    maximizable: false,
    minimizable: false,
    name: SETTINGS_MENU_WINDOW,
    resizable: false,
    saveWindowState: false,
    showTaskbarIcon: false,
    url: ROUTES.SETTINGS_MENU,
    waitForPageLoad: true,
  },
  snapshot: {
    alwaysOnTop: true,
    autoShow: false,
    contextMenu: !isProduction,
    defaultCentered: false,
    defaultHeight: 300,
    defaultWidth: 300,
    frame: false,
    id: SNAPSHOT_WINDOW,
    maxHeight: -1,
    maximizable: false,
    minHeight: 0,
    minWidth: 0,
    minimizable: false,
    name: SNAPSHOT_WINDOW,
    resizable: false,
    saveWindowState: false,
    shadow: true,
    showTaskbarIcon: false,
    url: ROUTES.SNAPSHOT,
    waitForPageLoad: true,
  },
  snapshotOverlay: {
    alwaysOnTop: true,
    autoShow: false,
    contextMenu: !isProduction,
    defaultCentered: false,
    defaultHeight: 300,
    defaultWidth: 300,
    frame: false,
    id: SNAPSHOT_OVERLAY_WINDOW,
    maxHeight: -1,
    maximizable: false,
    minHeight: 0,
    minWidth: 0,
    minimizable: false,
    name: SNAPSHOT_OVERLAY_WINDOW,
    opacity: 0.5,
    resizable: false,
    saveWindowState: false,
    shadow: false,
    showTaskbarIcon: false,
    url: ROUTES.SNAPSHOT_OVERLAY,
    waitForPageLoad: true,
  },
  support: {
    alwaysOnTop: false,
    autoShow: false,
    contextMenu: !isProduction,
    defaultCentered: false,
    defaultHeight: 478,
    defaultWidth: 510,
    frame: false,
    id: SUPPORT_WINDOW,
    maxHeight: -1,
    maximizable: false,
    minHeight: 0,
    minWidth: 0,
    minimizable: false,
    name: SUPPORT_WINDOW,
    resizable: false,
    saveWindowState: false,
    shadow: true,
    showTaskbarIcon: true,
    url: ROUTES.SUPPORT,
    waitForPageLoad: true,
  },
};

export const adminWindows = {
  admin: {
    alwaysOnTop: false,
    autoShow: false,
    contextMenu: !isProduction,
    defaultCentered: true,
    defaultHeight: 621,
    defaultWidth: 614,
    frame: false,
    id: ADMIN_WINDOW,
    maxHeight: -1,
    maximizable: false,
    minHeight: 500,
    minWidth: 450,
    minimizable: true,
    name: ADMIN_WINDOW,
    resizable: true,
    saveWindowState: false,
    shadow: true,
    showTaskbarIcon: true,
    url: ROUTES.ADMIN_SETTINGS,
    waitForPageLoad: true,
  },
  preview: {
    alwaysOnTop: false,
    autoShow: false,
    contextMenu: !isProduction,
    defaultCentered: false,
    defaultHeight: 718,
    defaultWidth: 664,
    frame: false,
    id: PREVIEW_WINDOW,
    maxHeight: -1,
    maximizable: false,
    minHeight: 0,
    minWidth: 0,
    minimizable: false,
    name: PREVIEW_WINDOW,
    resizable: false,
    saveWindowState: false,
    shadow: true,
    showTaskbarIcon: true,
    url: ROUTES.PREVIEW,
    waitForPageLoad: true,
  },
};

export const authWindows = {
  login: {
    alwaysOnTop: false,
    autoShow: true,
    contextMenu: !isProduction,
    cornerRounding: {
      height: 6,
      width: 6,
    },
    defaultCentered: true,
    defaultHeight: 478,
    defaultWidth: 510,
    frame: false,
    id: LOGIN_WINDOW,
    maxHeight: -1,
    maximizable: false,
    minHeight: 0,
    minWidth: 0,
    minimizable: false,
    name: LOGIN_WINDOW,
    resizable: false,
    saveWindowState: false,
    shadow: true,
    showTaskbarIcon: true,
    url: ROUTES.LOGIN,
    waitForPageLoad: true,
  },
};

// Multi-windows' default config should not be used
// Additional context specific information may need to be appended
export const multiWindows = {
  channelsContext: {
    alwaysOnTop: false,
    autoShow: false,
    contextMenu: !isProduction,
    defaultCentered: false,
    defaultHeight: 240,
    defaultWidth: 320,
    frame: true,
    id: CHANNELS_CONTEXT_WINDOW,
    maximizable: false,
    minimizable: false,
    name: CHANNELS_CONTEXT_WINDOW,
    resizable: true,
    saveWindowState: false,
    shadow: true,
    showTaskbarIcon: false,
    url: ROUTES.CHANNELS_CONTEXT,
    waitForPageLoad: true,
  },
};

const config = {
  ...defaultWindows,
  ...adminWindows,
  ...authWindows,
};

export default config;
