import {
  getMeError,
  getMeRequest,
  getMeSuccess,
  getSettingsError,
  getSettingsRequest,
  getSettingsSuccess,
  loginError,
  loginRequest,
  loginSuccess,
  loginWithNewPassword,
  logoutError,
  logoutRequest,
  logoutSuccess,
  saveSettingsError,
  saveSettingsRequest,
  saveSettingsSuccess,
  setAppIds,
  setAutoHide,
  setLauncherPosition,
  setLauncherSize,
  setMe,
  showSetPasswordForm,
  updatePasswordError,
  updatePasswordRequest,
  updatePasswordSuccess,
} from './actions';

import { DirectionalPosition, LauncherSize } from '../../types/commons';

// State
export interface MeSettingsState {
  appIds: string[];
  autoHide: boolean;
  launcherPosition: DirectionalPosition;
  launcherSize: LauncherSize;
}

export interface MeLoginState {
  changePassword: boolean;
  error: boolean;
  session: string;
  message: string;
}

// Reducer
export interface MeState {
  email: string;
  firstName: string;
  isAdmin: boolean;
  lastName: string;
  login: MeLoginState;
  settings: MeSettingsState;
}

// Action payloads
export interface LoginRequestPayload {
  username: string;
  password: string;
}

export interface LoginWithNewPasswordPayload {
  username: string;
  newPassword: string;
  session: string;
}

export interface LoginSuccessPayload {
  firstName: string;
  email: string;
  isAdmin: boolean;
  lastName: string;
}

export interface SetMePayload {
  firstName: string;
  email: string;
  isAdmin: boolean;
  lastName: string;
}

export interface SetAppIdsPayload {
  appIds: string[];
}

export interface SetAutoHidePayload {
  autoHide: boolean;
}

export interface SetLauncherPositionPayload {
  launcherPosition: DirectionalPosition;
}

export interface SetLauncherSizePayload {
  launcherSize: LauncherSize;
}

export interface NewPasswordPayload {
  session: string;
  message: string;
}

export interface UpdatePasswordRequestPayload {
  password: string;
  newPassword: string;
}

// use APIResponse interface from 'interfaces.ts'
export interface UpdatePasswordSuccessPayload {
  status: string;
  message?: string;
}

export interface UpdatePasswordErrorPayload {
  status: string;
  code?: string;
  message?: string;
}

// Actions
export type GetSettingsRequest = ReturnType<typeof getSettingsRequest>;
export type GetSettingsSuccess = ReturnType<typeof getSettingsSuccess>;
export type GetSettingsError = ReturnType<typeof getSettingsError>;

export type LoginRequest = ReturnType<typeof loginRequest>;
export type LoginSuccess = ReturnType<typeof loginSuccess>;
export type LoginError = ReturnType<typeof loginError>;

export type GetMeRequest = ReturnType<typeof getMeRequest>;
export type GetMeSuccess = ReturnType<typeof getMeSuccess>;
export type GetMeError = ReturnType<typeof getMeError>;

export type LogoutRequest = ReturnType<typeof logoutRequest>;
export type LogoutSuccess = ReturnType<typeof logoutSuccess>;
export type LogoutError = ReturnType<typeof logoutError>;

export type LoginWithNewPassword = ReturnType<typeof loginWithNewPassword>;

export type SaveSettingsRequest = ReturnType<typeof saveSettingsRequest>;
export type SaveSettingsSuccess = ReturnType<typeof saveSettingsSuccess>;
export type SaveSettingsError = ReturnType<typeof saveSettingsError>;

export type SetMe = ReturnType<typeof setMe>;

export type SetAppIds = ReturnType<typeof setAppIds>;
export type SetAutoHide = ReturnType<typeof setAutoHide>;
export type SetLauncherPosition = ReturnType<typeof setLauncherPosition>;
export type SetLauncherSize = ReturnType<typeof setLauncherSize>;

export type ShowSetPasswordForm = ReturnType<typeof showSetPasswordForm>;

export type UpdatePasswordRequest = ReturnType<typeof updatePasswordRequest>;
export type UpdatePasswordSuccess = ReturnType<typeof updatePasswordSuccess>;
export type UpdatePasswordError = ReturnType<typeof updatePasswordError>;

export type MeActions =
  | GetSettingsRequest
  | GetSettingsSuccess
  | GetSettingsError
  | GetMeRequest
  | GetMeSuccess
  | GetMeError
  | LoginRequest
  | LoginSuccess
  | LoginError
  | SaveSettingsRequest
  | SaveSettingsSuccess
  | SaveSettingsError
  | SetMe
  | UpdatePasswordRequest
  | UpdatePasswordSuccess
  | UpdatePasswordError
  | SetLauncherPosition
  | ShowSetPasswordForm;
