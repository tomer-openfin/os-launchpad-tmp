import { all, call, put, race, select, take, takeEvery } from 'redux-saga/effects';

import { LAYOUTS_WINDOW } from '../../config/windows';
import ApiService from '../../services/ApiService';
import { AppStatusOrigins, AppStatusStates, Transition } from '../../types/commons';
import getAppUuid from '../../utils/getAppUuid';
import { getFinWindowByName } from '../../utils/getLauncherFinWindow';
import { generateLayout, restoreLayout as restoreFinLayout } from '../../utils/openfinLayouts';
import { animateWindow } from '../../utils/openfinPromises';
import { calcBoundsRelativeToLauncher } from '../../utils/windowPositionHelpers';
import { getApps, getAppsStatusById, openFinApp, setFinAppStatusState } from '../apps';
import { getLauncherPosition, getLauncherSizeConfig } from '../me';
import { getExpandedSystemDrawerSize } from '../selectors';
import { getErrorFromCatch, getErrorMessageFromResponse, isErrorResponse } from '../utils';
import { getWindowBounds } from '../windows';
import { createLayout, deleteLayout, dismissUndoUpdateLayout, getLayouts, restoreLayout, saveLayout, undoUpdateLayout, updateLayout } from './actions';
import { getAllLayouts, getLayoutById, getLayoutByName } from './selectors';
import { calcDesiredLayoutsWindowHeight } from './utils';

function* watchLayoutsChangesToAnimateWindow() {
  try {
    const layoutsWindow = yield call(getFinWindowByName, LAYOUTS_WINDOW);

    const bounds: ReturnType<typeof getWindowBounds> = yield select(getWindowBounds, LAYOUTS_WINDOW);
    const launcherBounds: ReturnType<typeof getWindowBounds> = yield select(getWindowBounds, getAppUuid());
    const launcherPosition: ReturnType<typeof getLauncherPosition> = yield select(getLauncherPosition);
    const launcherSizeConfig: ReturnType<typeof getLauncherSizeConfig> = yield select(getLauncherSizeConfig);
    const expandedSystemDrawerSize: ReturnType<typeof getExpandedSystemDrawerSize> = yield select(getExpandedSystemDrawerSize);
    const layouts: ReturnType<typeof getAllLayouts> = yield select(getAllLayouts);

    if (!bounds || !layouts || !layoutsWindow || !launcherBounds) {
      return;
    }

    const animationBounds = calcBoundsRelativeToLauncher(
      LAYOUTS_WINDOW,
      { ...bounds, height: calcDesiredLayoutsWindowHeight(layouts.length) },
      launcherBounds,
      launcherPosition,
      launcherSizeConfig,
      expandedSystemDrawerSize,
    );

    const transitions: Transition = {
      position: {
        duration: 80,
        left: animationBounds.left,
        relative: false,
        top: animationBounds.top,
      },
      size: {
        duration: 80,
        height: animationBounds.height,
        relative: false,
        width: animationBounds.width,
      },
    };

    yield call(animateWindow, layoutsWindow, transitions, { interrupt: false });
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.log('Error in watchLayoutsChangesToAnimateWindow', error);
  }
}

function* watchGetLayoutsRequest(action: ReturnType<typeof getLayouts.request>) {
  try {
    const response = yield call(ApiService.getUserLayouts);

    if (isErrorResponse(response)) {
      throw new Error(getErrorMessageFromResponse(response));
    }

    yield put(getLayouts.success(response, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(getLayouts.failure(error, action.meta));
  }
}

function* watchCreateLayoutRequest(action: ReturnType<typeof createLayout.request>) {
  try {
    const name = action.payload || 'layout';
    const layout = yield call(generateLayout);

    const userLayout = { name, layout };
    const response = yield call(ApiService.createUserLayout, userLayout);

    if (isErrorResponse(response) || !response.layout) {
      throw new Error(getErrorMessageFromResponse(response));
    }

    yield put(createLayout.success(response, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(createLayout.failure(error, action.meta));
  }
}

function* watchDeleteLayoutRequest(action: ReturnType<typeof deleteLayout.request>) {
  try {
    const response = yield call(ApiService.deleteUserLayout, action.payload);

    if (isErrorResponse(response)) {
      throw new Error(getErrorMessageFromResponse(response));
    }

    yield put(deleteLayout.success(action.payload, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(deleteLayout.failure(error, action.meta));
  }
}

function* watchRestoreLayoutRequest(action: ReturnType<typeof restoreLayout.request>) {
  try {
    const layoutId = action.payload;
    const userLayout: ReturnType<typeof getLayoutById> = yield select(getLayoutById, layoutId);
    const { layout } = userLayout;
    if (!layoutId || !userLayout || !layout) {
      throw new Error('Error getting layout for restore');
    }

    const apps: ReturnType<typeof getApps> = yield select(getApps);
    const appsStatusById: ReturnType<typeof getAppsStatusById> = yield select(getAppsStatusById);

    yield all(
      layout.apps.map(layoutApp => {
        const { manifestUrl, uuid } = layoutApp;
        const matchingApp = apps.find(app => app.manifest_url === manifestUrl);

        if (!matchingApp) {
          // tslint:disable-next-line:no-console
          console.error('Could not find manifestUrl in list of applications.', manifestUrl, uuid);
          return;
        }

        const { id } = matchingApp;
        const appStatus = appsStatusById[id];

        if (!appStatus || (appStatus && appStatus.state === AppStatusStates.Closed)) {
          return put(setFinAppStatusState({ id, statusState: AppStatusStates.Loading, origin: AppStatusOrigins.LayoutRestore }));
        }
        return;
      }),
    );
    const restoredLayout = yield call(restoreFinLayout, layout);
    yield put(restoreLayout.success(restoredLayout, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(restoreLayout.failure(error, action.meta));
  }
}

function* watchRestoreLayoutSuccess(action: ReturnType<typeof restoreLayout.success>) {
  try {
    const apps: ReturnType<typeof getApps> = yield select(getApps);
    const appsStatusById: ReturnType<typeof getAppsStatusById> = yield select(getAppsStatusById);
    yield all(
      action.payload.apps.map(layoutApp => {
        const { manifestUrl, uuid } = layoutApp;
        const matchingApp = apps.find(app => app.manifest_url === manifestUrl);

        if (!matchingApp) {
          // tslint:disable-next-line:no-console
          console.error('Could not find manifestUrl in list of applications.', manifestUrl, uuid);
          return;
        }

        const { id } = matchingApp;
        const appStatus = appsStatusById[id];

        if (appStatus && appStatus.state === AppStatusStates.Loading && appStatus.origin === AppStatusOrigins.LayoutRestore) {
          return put(
            openFinApp.success({
              id,
              origin: AppStatusOrigins.LayoutRestore,
              // TODO: clean up any, maybe upgrade types
              // tslint:disable-next-line:no-any
              runtimeVersion: (layoutApp as any).runtime ? (layoutApp as any).runtime.version : '',
              uuid,
            }),
          );
        }

        return;
      }),
    );
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.log('Error in watchRestoreLayoutSuccess', error);
  }
}

function* watchSaveLayoutRequest(action: ReturnType<typeof saveLayout.request>) {
  try {
    const name = action.payload;
    const layoutByName: ReturnType<typeof getLayoutByName> = yield select(getLayoutByName, name);

    if (layoutByName) {
      const id = layoutByName.id;
      const updatePayload = { id, isOverwrite: true, layout: layoutByName, name };

      yield put(updateLayout.request(updatePayload, action.meta));
      return;
    }

    yield put(createLayout.request(name, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(saveLayout.failure(error, action.meta));
  }
}

function* watchUpdateLayoutRequest(action: ReturnType<typeof updateLayout.request>) {
  try {
    const { id, isOverwrite, name, layout: previousUserLayout } = action.payload;
    let { layout } = previousUserLayout;
    if (isOverwrite) {
      layout = yield call(generateLayout);
    }

    const userLayout = {
      id,
      layout,
      name,
    };

    const response = yield call(ApiService.updateUserLayout, userLayout);

    if (isErrorResponse(response) || !response.layout) {
      throw new Error(getErrorMessageFromResponse(response));
    }

    yield put(updateLayout.success({ previousUserLayout, layout: response.layout, updated: true }, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(updateLayout.failure(error, action.meta));
  }
}

function* watchUpdateLayoutSuccess(action: ReturnType<typeof updateLayout.success>) {
  try {
    yield call(watchLayoutsChangesToAnimateWindow);

    const { dismiss, undo } = yield race({
      dismiss: take(dismissUndoUpdateLayout.request),
      undo: take(undoUpdateLayout.request),
    });

    const { previousUserLayout } = action.payload;
    if (undo && previousUserLayout) {
      yield put(updateLayout.request({ id: previousUserLayout.id, isOverwrite: false, layout: previousUserLayout, name: previousUserLayout.name }, undo.meta));
    }
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.log('Error in watchUpdateLayoutSuccess', error);
  }
}

export function* layoutsSaga() {
  yield takeEvery(getLayouts.request, watchGetLayoutsRequest);
  yield takeEvery(createLayout.request, watchCreateLayoutRequest);
  yield takeEvery(deleteLayout.request, watchDeleteLayoutRequest);
  yield takeEvery(restoreLayout.request, watchRestoreLayoutRequest);
  yield takeEvery(restoreLayout.success, watchRestoreLayoutSuccess);
  yield takeEvery(saveLayout.request, watchSaveLayoutRequest);
  yield takeEvery(updateLayout.request, watchUpdateLayoutRequest);
  yield takeEvery(updateLayout.success, watchUpdateLayoutSuccess);

  yield takeEvery([createLayout.success.toString(), deleteLayout.success.toString(), getLayouts.success.toString()], watchLayoutsChangesToAnimateWindow);
}
