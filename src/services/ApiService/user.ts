import { MeSettingsState, UpdatePasswordRequestPayload } from '../../redux/me';
import { defaultSettings } from '../../redux/me/reducer';
import { ApiResponse, HTTPMethods, NewUserLayout, User, UserLayout } from '../../types/commons';
import { SendAnalyticsPayload } from '../../utils/analytics';
import { checkIsEnterprise } from '../../utils/checkIsEnterprise';
import { uuidv4 } from '../../utils/createUuid';
import { deleteInLocalStorage, getInLocalStorage, getLocalStorage, LOCAL_STORAGE_KEYS, setInLocalStorage, setLocalStorage } from '../localStorageAdapter';
import API from './api';
import { api, transformNullCheck, transformObjectCheck } from './utils';

const emptyMeSettings: Partial<MeSettingsState> = {};

/**
 * Get user info
 */
export const getUserInfo = api<User>(API.USER_INFO, HTTPMethods.GET, transformObjectCheck<User>('getUserInfo'));
export type GetUserInfo = typeof getUserInfo;

/**
 * Get user layouts
 */
export const getUserLayouts = (): Promise<ApiResponse<UserLayout[]>> => {
  if (checkIsEnterprise()) {
    return api<UserLayout[]>(API.USER_LAYOUTS, HTTPMethods.GET, transformNullCheck([] as UserLayout[]))();
  }

  return getLocalStorage(LOCAL_STORAGE_KEYS.LAYOUTS, [] as UserLayout[]);
};
export type GetUserLayouts = typeof getUserLayouts;

/**
 * Get user layout
 */
export const getUserLayout = (id: UserLayout['id']): Promise<ApiResponse<UserLayout>> => {
  if (checkIsEnterprise()) {
    return api<UserLayout>(`${API.USER_LAYOUTS}/${id}`, HTTPMethods.GET, transformObjectCheck<UserLayout>('getUserLayout'))();
  }

  return getInLocalStorage(LOCAL_STORAGE_KEYS.LAYOUTS, id);
};
export type GetUserLayout = typeof getUserLayout;

/**
 * Create user layout
 */
export const createUserLayout = (newUserLayout: NewUserLayout): Promise<ApiResponse<UserLayout>> => {
  if (checkIsEnterprise()) {
    return api<UserLayout, NewUserLayout>(API.USER_LAYOUTS, HTTPMethods.POST, transformObjectCheck<UserLayout>('createUserLayout', 'layout'))(newUserLayout);
  }

  const localUserLayout: UserLayout = { ...newUserLayout, id: uuidv4() };

  return setInLocalStorage(LOCAL_STORAGE_KEYS.LAYOUTS, localUserLayout, localUserLayout.id);
};
export type CreateUserLayout = typeof createUserLayout;

/**
 * Delete user layout
 */
export const deleteUserLayout = (id: UserLayout['id']): Promise<ApiResponse<undefined>> => {
  if (checkIsEnterprise()) {
    return api<undefined>(`${API.USER_LAYOUTS}/${id}`, HTTPMethods.DELETE, _ => ({ data: undefined }))();
  }

  return deleteInLocalStorage(LOCAL_STORAGE_KEYS.LAYOUTS, id);
};
export type DeleteUserLayout = typeof deleteUserLayout;

/**
 * Update user layout
 */
export const updateUserLayout = (userLayout: UserLayout): Promise<ApiResponse<UserLayout>> => {
  if (checkIsEnterprise()) {
    return api<UserLayout, UserLayout>(`${API.USER_LAYOUTS}/${userLayout.id}`, HTTPMethods.PUT, transformObjectCheck<UserLayout>('updateUserLayout', 'layout'))(
      userLayout,
    );
  }

  return setInLocalStorage(LOCAL_STORAGE_KEYS.LAYOUTS, userLayout, userLayout.id);
};
export type UpdateUserLayout = typeof updateUserLayout;

/**
 * Get user settings
 */
export const getUserSettings = (): Promise<ApiResponse<Partial<MeSettingsState>>> => {
  if (checkIsEnterprise()) {
    return api<Partial<MeSettingsState>>(API.USER_SETTINGS, HTTPMethods.GET, transformNullCheck(emptyMeSettings))();
  }

  return getLocalStorage<MeSettingsState>(LOCAL_STORAGE_KEYS.SETTINGS, defaultSettings);
};
export type GetUserSettings = typeof getUserSettings;

/**
 * Save user settings
 */
export const saveUserSettings = (settings: MeSettingsState): Promise<ApiResponse<undefined>> => {
  if (checkIsEnterprise()) {
    return api<undefined, { settings: MeSettingsState }>(API.USER_SETTINGS, HTTPMethods.POST, _ => ({ data: undefined }))({ settings });
  }

  return setLocalStorage(LOCAL_STORAGE_KEYS.SETTINGS, settings);
};
export type SaveUserSettings = typeof saveUserSettings;

/**
 * Post user stats
 */
export const postUserStats = (payload: SendAnalyticsPayload) =>
  api<undefined, SendAnalyticsPayload>(`${API.USER_STATS}/${payload.event.type}`, HTTPMethods.POST, _ => ({ data: undefined }))(payload);

/**
 * Update user password
 */
export const updateUserPassword = api<undefined, UpdatePasswordRequestPayload>(API.UPDATE_PASSWORD, HTTPMethods.POST, _ => ({ data: undefined }));
export type UpdateUserPassword = typeof updateUserPassword;
