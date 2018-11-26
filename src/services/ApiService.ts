import { Layout } from 'openfin-layouts/dist/client/types';

import { getIsEnterprise } from '../redux/application';
import { defaultState, MeStateSettings } from '../redux/me';
import { getLocalStorage, setLocalStorage } from './localStorageAdapter';

import { DeleteAppResponse } from '../types/commons';

const API_URL = process.env.API_URL; // || 'http://localhost:9001/';
const APPS_URL = `${API_URL}api/apps`;
const LAYOUTS_URL = `${API_URL}api/layouts`;
const LOGIN_URL = `${API_URL}/api/auth/login`;
const SETTINGS_URL = `${API_URL}api/settings`;

const LOCAL_STORAGE_KEYS = {
  APPS: 'apps',
  LAYOUTS: 'layouts',
  SETTINGS: 'settings',
};

const createGetOptions = (): RequestInit => ({
  headers: {
    'content-type': 'application/json',
  },
  method: 'GET',
  mode: 'cors',
});

const createPostOptions = (body): RequestInit => ({
  body: JSON.stringify(body),
  headers: {
    'content-type': 'application/json',
  },
  method: 'POST',
  mode: 'cors',
});

const createDeleteOptions = (): RequestInit => ({
  headers: {
    'content-type': 'application/json',
  },
  method: 'DELETE',
  mode: 'cors',
});

export const checkIsEnterprise = () => {
  const store = window.opener ? window.opener.store : window.store;
  const state = store.getState();
  return getIsEnterprise(state);
};

/**
 * Get apps
 *
 * @returns {Promise<string[]>}
 */
export const getApps = () => {
  if (checkIsEnterprise()) {
    const options = createGetOptions();
    return fetch(APPS_URL, options)
      .then(resp => resp.json())
      .then(resp => resp.apps as string[]);
  }

  return getLocalStorage<string[]>(LOCAL_STORAGE_KEYS.APPS, []);
};

/**
 * Save apps
 *
 * @returns {Promise<void>}
 */
export const saveApps = (apps: string[]) => {
  // if (checkIsEnterprise()) {
  //   const options = createPostOptions({ apps });
  //   return fetch(APPS_URL, options).then(resp => resp.json());
  // }

  return setLocalStorage<string[]>(LOCAL_STORAGE_KEYS.APPS, apps);
};

/**
 * Delete apps
 *
 * @returns {Promise<DeleteAppResponse>}
 */
export const deleteApp = (appId: string) => {
  const options = createDeleteOptions();

  return fetch(`${APPS_URL}/${appId}`, options).then(resp => (resp.json() as unknown) as DeleteAppResponse);
};

/**
 * Get layouts
 *
 * @returns {Promise<Layout[]>}
 */
export const getLayouts = () => {
  // Disable enterprise check for demo
  // if (checkIsEnterprise()) {
  //   const options = createGetOptions();
  //   return fetch(LAYOUTS_URL, options)
  //     .then(resp => resp.json())
  //     .then(resp => resp.map(r => r.layout) as Layout[]);
  // }

  return getLocalStorage<Layout[]>(LOCAL_STORAGE_KEYS.LAYOUTS, []);
};

/**
 * Save layouts
 *
 * @returns {Promise<void>}
 */
export const saveLayout = (layout: Layout) => {
  // Disable enterprise check for demo
  // if (checkIsEnterprise()) {
  //   const options = createPostOptions({ layout });
  //   return fetch(LAYOUTS_URL, options).then(resp => resp.json());
  // }

  return setLocalStorage<Layout[]>(LOCAL_STORAGE_KEYS.LAYOUTS, [layout]);
};

/**
 * Login
 *
 * @returns {Promise<>}
 */
export const login = payload => {
  const options = createPostOptions(payload);

  options.credentials = 'include';

  return fetch(LOGIN_URL, options)
    .then(resp => resp.json())
    .then(resp => resp);
};

/**
 * Get settings
 *
 * @returns {Promise<MeStateSettings>}
 */
export const getSettings = () => {
  if (checkIsEnterprise()) {
    const options = createGetOptions();
    return fetch(SETTINGS_URL, options)
      .then(resp => resp.json())
      .then(resp => resp.settings as MeStateSettings);
  }

  return getLocalStorage<MeStateSettings>(LOCAL_STORAGE_KEYS.SETTINGS, defaultState.settings);
};

/**
 * Save settings
 *
 * @returns {Promise<void>}
 */
export const saveSettings = (settings: MeStateSettings) => {
  if (checkIsEnterprise()) {
    const options = createPostOptions({ settings });
    return fetch(SETTINGS_URL, options).then(resp => resp.json());
  }

  return setLocalStorage<MeStateSettings>(LOCAL_STORAGE_KEYS.SETTINGS, settings);
};

// pass statusCode of '400' to simulate failure response
// todo: type interfaces for these paramaters & create consts for various methods/statuscodes
const defaultEndpoint = `${process.env.MOCK_POSTMAN_URI}/api/admin/users`;
export const tempFetch = (endpoint = defaultEndpoint, method, payload, statusCode = '200') => {
  return fetch(endpoint, {
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'x-api-key': `${process.env.POSTMAN_API_KEY}`,
      'x-mock-response-code': `${statusCode}`, // postman specific
    },
    method,
  }).then(response => response.json());
};

export default {
  getApps,
  getLayouts,
  getSettings,
  login,
  saveApps,
  saveLayout,
  saveSettings,
  tempFetch,
};
