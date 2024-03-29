import { Bounds } from '../../types/commons';
import { NormalizedById } from '../../utils/reduxHelpers';
import { ActionsUnion } from '../types';
import {
  hideWindow,
  launchWindow,
  openWindow,
  recoverLostWindows,
  toggleWindow,
  windowBlurred,
  windowBoundsChanged,
  windowClosed,
  windowHidden,
  windowShown,
} from './actions';

export interface WindowState {
  bounds?: Bounds;
  id: string;
  isShowing?: boolean;
  name: string;
  uuid: string;
}

// State
export interface WindowsState {
  byId: NormalizedById<WindowState>;
  ids: string[];
}

// Action payloads
export interface WindowNamePayload {
  name: string;
}

export interface WindowConfig {
  alwaysOnTop: boolean;
  autoShow: boolean;
  contextMenu: boolean;
  cornerRounding?: {
    height: number;
    width: number;
  };
  defaultCentered: boolean;
  defaultHeight: number;
  defaultLeft?: number;
  defaultTop?: number;
  defaultWidth: number;
  frame: boolean;
  id?: string;
  maxHeight?: number;
  maximizable: boolean;
  minHeight?: number;
  minWidth?: number;
  minimizable: boolean;
  name: string;
  opacity?: number;
  resizable: boolean;
  saveWindowState: boolean;
  shadow?: boolean;
  showTaskbarIcon: boolean;
  // smallWindow: boolean;
  url: string;
  waitForPageLoad: boolean;
}

export interface WindowConfigsMap {
  [key: string]: WindowConfig;
}

// Actions
export type WindowsActions =
  | ActionsUnion<typeof hideWindow>
  | ActionsUnion<typeof openWindow>
  | ReturnType<typeof launchWindow>
  | ReturnType<typeof recoverLostWindows>
  | ReturnType<typeof toggleWindow>
  | ReturnType<typeof windowBlurred>
  | ReturnType<typeof windowBoundsChanged>
  | ReturnType<typeof windowClosed>
  | ReturnType<typeof windowHidden>
  | ReturnType<typeof windowShown>;
