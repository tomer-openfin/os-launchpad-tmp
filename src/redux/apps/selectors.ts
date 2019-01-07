import { createSelector } from 'reselect';

import { App } from '../../types/commons';
import { objectsFromIds } from '../../utils/byIds';
import { State } from '../types';

export const getAppsState = (state: State) => state.apps;

// byId
export const getAppsById = (state: State) => getAppsState(state).byId;
export const getAppById = (state: State, id: string): App | undefined => getAppsById(state)[id];

// ids
export const getAppsIds = (state: State) => getAppsState(state).ids;

// statusById
export const getAppsStatusById = (state: State) => getAppsState(state).statusById;
export const getAppStatusById = (state: State, id: string) => getAppsStatusById(state)[id];

// Selectors
export const getApps = createSelector(
  [getAppsById, getAppsIds],
  (byId, ids) => ids.map(id => byId[id]),
);
export const getAppsDirectoryAppList = createSelector(
  [getAppsById, getAppsIds],
  objectsFromIds,
);
