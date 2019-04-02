import { State } from '../types';

import { createSelector } from 'reselect';
import { denormalizeData } from '../../utils/reduxHelpers';
import { EXPANDED_LAUNCHER_WINDOWS_SHOWING } from './utils';

export const getWindowsState = (state: State) => state.windows;
export const getWindowsById = (state: State) => getWindowsState(state).byId;
export const getWindowsIds = (state: State) => getWindowsState(state).ids;
export const getWindowById = (state: State, id: string) => getWindowsById(state)[id];
export const getWindows = createSelector(
  [getWindowsIds, getWindowsById],
  (ids, byId) => denormalizeData(ids, byId),
);

export const getWindowBounds = (state: State, id: string) => {
  const win = getWindowById(state, id);

  return win ? win.bounds : undefined;
};

export const getWindowIsShowing = (state: State, id: string) => {
  const win = getWindowById(state, id);

  return win ? !!win.isShowing : false;
};

export const getPosition = (state: State) => state.me.settings.launcherPosition;

/**
 * Launcher needs to know if any of the following windows are show to not collapse
 */
export const getLauncherIsForceExpanded = createSelector(
  getWindowsById,
  byId => {
    const foundWindow = EXPANDED_LAUNCHER_WINDOWS_SHOWING.find(name => {
      const win = byId[name];
      return win && !!win.isShowing;
    });

    return !!foundWindow;
  },
);
