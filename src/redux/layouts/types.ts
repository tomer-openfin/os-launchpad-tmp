import { UserLayout } from '../../types/commons';

import { getLayoutsError, getLayoutsRequest, getLayoutsSuccess, restoreLayoutRequest } from './';
import {
  createLayoutError,
  createLayoutRequest,
  createLayoutSuccess,
  deleteLayoutRequest,
  restoreLayoutError,
  restoreLayoutSuccess,
  saveLayoutError,
  saveLayoutRequest,
  saveLayoutSuccess,
  updateLayoutError,
  updateLayoutRequest,
  updateLayoutSuccess,
} from './actions';

// State
export interface LayoutsState {
  byId: {
    [id: string]: UserLayout;
  };
  ids: string[];
}

// Action payloads
export type GetLayoutsSuccessPayload = UserLayout[];
export interface UpdateLayoutRequestPayload {
  id: string;
  name: string;
  layout?: UserLayout;
}
export interface CreateOrUpdateSuccessPayload {
  layout: UserLayout;
  updated?: boolean;
}
export interface UpdateSuccessPayload extends CreateOrUpdateSuccessPayload {
  previousUserLayout: UserLayout;
}

// Actions
export type GetLayoutsRequest = ReturnType<typeof getLayoutsRequest>;
export type GetLayoutsError = ReturnType<typeof getLayoutsError>;
export type GetLayoutsSuccess = ReturnType<typeof getLayoutsSuccess>;

export type RestoreLayoutRequest = ReturnType<typeof restoreLayoutRequest>;
export type RestoreLayoutError = ReturnType<typeof restoreLayoutError>;
export type RestoreLayoutSuccess = ReturnType<typeof restoreLayoutSuccess>;

export type CreateLayoutRequest = ReturnType<typeof createLayoutRequest>;
export type CreateLayoutError = ReturnType<typeof createLayoutError>;
export type CreateLayoutSuccess = ReturnType<typeof createLayoutSuccess>;

export type UpdateLayoutRequest = ReturnType<typeof updateLayoutRequest>;
export type UpdateLayoutError = ReturnType<typeof updateLayoutError>;
export type UpdateLayoutSuccess = ReturnType<typeof updateLayoutSuccess>;
export type DeleteLayoutRequest = ReturnType<typeof deleteLayoutRequest>;

export type SaveLayoutRequest = ReturnType<typeof saveLayoutRequest>;
export type SaveLayoutSuccess = ReturnType<typeof saveLayoutSuccess>;
export type SaveLayoutError = ReturnType<typeof saveLayoutError>;

export type LayoutsActions =
  | DeleteLayoutRequest
  | GetLayoutsRequest
  | GetLayoutsError
  | GetLayoutsSuccess
  | RestoreLayoutRequest
  | RestoreLayoutError
  | RestoreLayoutSuccess
  | CreateLayoutRequest
  | CreateLayoutError
  | CreateLayoutSuccess
  | UpdateLayoutRequest
  | UpdateLayoutError
  | UpdateLayoutSuccess
  | SaveLayoutRequest
  | SaveLayoutSuccess
  | SaveLayoutError;
