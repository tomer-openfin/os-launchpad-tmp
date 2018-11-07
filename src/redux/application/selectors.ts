import { State } from '../types';

export const getApplicationState = (state: State) => state.application;
export const getIsEnterprise = (state: State) => getApplicationState(state).isEnterprise;