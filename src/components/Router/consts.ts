export interface MatchParams {
  action: string;
  id: string;
}

export const CHANNELS_CONTEXT_PARAM = ':channelId';

export const ADMIN_SETTINGS_ROUTES = {
  ADMIN_SETTINGS_DELETE: '/admin/settings/delete',
  ADMIN_SETTINGS_EDIT: '/admin/settings/edit',
};

export const ADMIN_APPS_ROUTES = {
  ADMIN_APPS_DELETE: '/admin/apps/delete/',
  ADMIN_APPS_EDIT: '/admin/apps/edit/',
  ADMIN_APPS_NEW: '/admin/apps/new/',
};

export const ADMIN_USERS_ROUTES = {
  ADMIN_USERS_DELETE: '/admin/users/delete/',
  ADMIN_USERS_EDIT: '/admin/users/edit/',
  ADMIN_USERS_IMPORT: '/admin/users/import/',
  ADMIN_USERS_NEW: '/admin/users/new/',
};

export const ADMIN_ROUTES = {
  ADMIN: '/admin',
  ADMIN_APPS: '/admin/apps/:action/:id?', // note: ? for optional params
  ...ADMIN_APPS_ROUTES,
  ADMIN_SETTINGS: '/admin/settings',
  ...ADMIN_SETTINGS_ROUTES,
  ADMIN_USERS: '/admin/users/:action/:id?',
  PREVIEW: '/preview',
  ...ADMIN_USERS_ROUTES,
};

export const SETTINGS_ROUTES = {
  SETTINGS_CONFIRM_PASSWORD: '/settings/confirm-password',
  SETTINGS_CONTACT_SUPPORT: '/settings/contact-support',
  SETTINGS_LAUNCHER_MONITOR: '/settings/launcher-monitor',
  SETTINGS_UPDATE_PASSWORD: '/settings/update-password',
};

export const ROUTES = {
  ...ADMIN_ROUTES,
  APP_DIRECTORY: '/app-directory',
  APP_LAUNCHER_OVERFLOW: '/app-overflow',
  CHANNELS: '/channels',
  CHANNELS_CONTEXT: `/channels/${CHANNELS_CONTEXT_PARAM}/context`,
  CONTEXT_MENU: '/context-menu',
  FORGOT_PASSWORD: '/forgot-password',
  HOME: '/',
  LAYOUTS: '/layouts',
  LOGIN: '/login',
  SETTINGS: '/settings/:action',
  SETTINGS_MENU: '/settings-menu',
  SNAPSHOT: '/snapshot',
  SNAPSHOT_OVERLAY: '/snapshot-overlay',
  SUPPORT: '/support',
  ...SETTINGS_ROUTES,
};
