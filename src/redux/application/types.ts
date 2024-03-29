import { ActionsUnion } from '../types';
import {
  applicationStarted,
  collapseApp,
  exitApplication,
  expandApp,
  fetchManifest,
  getManifest,
  getManifestOverride,
  initDevTools,
  launchAppLauncher,
  openfinReady,
  reboundLauncher,
  resetApplicationUi,
  setIsDragAndDrop,
  setIsEnterprise,
  setManifestUrl,
  setRuntimeVersion,
  setRvmVersion,
  updateManifestOverride,
} from './actions';

// State
export interface ApplicationState {
  isDragAndDrop: boolean;
  isDrawerExpanded: boolean;
  isEnterprise: boolean;
  manifest: Manifest;
  manifestOverride: ManifestOverride;
  manifestUrl: string;
  runtimeVersion: string;
  rvmVersion: string;
}

export interface ManifestImages {
  shortcut: {
    icon: string;
    name?: string;
  };
  splashScreenImage: string;
  startup_app: {
    icon: string;
  };
}

export interface Manifest extends ManifestImages {
  /* tslint:disable-next-line:no-any */
  [key: string]: any;
  startup_app: {
    icon: string;
    name?: string;
    url?: string;
  };
}

export type ManifestOverride = Partial<Manifest>;

// Action payloads
export interface OpenfinReadyPayload {
  finName: string;
}

export interface ReboundLauncherRequestPayload {
  delay: number;
  shouldAnimate: boolean;
}

// Actions
export type ApplicationActions =
  | ReturnType<typeof applicationStarted>
  | ReturnType<typeof collapseApp>
  | ReturnType<typeof exitApplication>
  | ReturnType<typeof expandApp>
  | ReturnType<typeof initDevTools>
  | ReturnType<typeof launchAppLauncher>
  | ReturnType<typeof openfinReady>
  | ReturnType<typeof resetApplicationUi>
  | ReturnType<typeof setIsDragAndDrop>
  | ReturnType<typeof setIsEnterprise>
  | ReturnType<typeof setRuntimeVersion>
  | ReturnType<typeof setRvmVersion>
  | ReturnType<typeof setManifestUrl>
  | ActionsUnion<typeof reboundLauncher>
  | ActionsUnion<typeof getManifestOverride>
  | ActionsUnion<typeof updateManifestOverride>
  | ActionsUnion<typeof fetchManifest>
  | ActionsUnion<typeof getManifest>;
