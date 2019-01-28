import { connect } from 'react-redux';
import { Action } from 'redux';

import { getDrawerIsExpanded, setIsDrawerExpanded } from '../../redux/application';
import { getLauncherPosition, getLauncherSizeConfig } from '../../redux/me';
import { getCollapsedSystemDrawerSize } from '../../redux/selectors';
import { State } from '../../redux/types';
import withAutoHideApp from './withAutoHideApp';

import App from './App';

const mapState = (state: State) => ({
  collapsedSystemDrawerSize: getCollapsedSystemDrawerSize(state),
  isDrawerExpanded: getDrawerIsExpanded(state),
  launcherPosition: getLauncherPosition(state),
  launcherSizeConfig: getLauncherSizeConfig(state),
});

const mapDispatch = dispatch => ({
  dispatch: (action: Action) => dispatch(action),
  toggleDrawer: (isDrawerExpanded: boolean) => dispatch(setIsDrawerExpanded(isDrawerExpanded)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...ownProps,
  toggleDrawer: () => dispatchProps.toggleDrawer(!stateProps.isDrawerExpanded),
});

export default withAutoHideApp(
  connect(
    mapState,
    mapDispatch,
    mergeProps,
  )(App),
);
