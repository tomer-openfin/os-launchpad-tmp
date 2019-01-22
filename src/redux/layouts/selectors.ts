import { createSelector } from 'reselect';
import { UserLayout } from '../../types/commons';
import { State } from '../types';

export const getLayoutsState = (state: State) => state.layouts;
export const getLayoutsById = (state: State) => getLayoutsState(state).byId;
export const getLayoutsIds = (state: State) => getLayoutsState(state).ids;
export const getLayoutById = (state: State, id: string): UserLayout => getLayoutsById(state)[id];

export const getLayouts = createSelector(
  getLayoutsIds,
  getLayoutsById,
  (ids, layouts) => ids.map(id => layouts[id]),
);
