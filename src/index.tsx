import { deregister } from 'openfin-layouts';

import Router from './components/Router';

import configureStore from './configureStore';
import { applicationStarted, openfinReady } from './redux/application/actions';
import { isProductionEnv } from './utils/processHelpers';
import renderWindow from './utils/renderWindow';
import setupReactCleanUp from './utils/setupReactCleanup';

const preventDragAndDrop = e => {
  if (e.target.type !== 'file') {
    e.preventDefault();
    e.dataTransfer.effectAllowed = 'none';
    e.dataTransfer.dropEffect = 'none';
  }
};

const isProduction = isProductionEnv();

const isMainWindow = !window.opener;

// If this is the main window and there is no store
// we need to create the application's store
if (isMainWindow && !window.store) {
  window.store = configureStore();

  // Dispatch the initial app startup action.
  window.store.dispatch(applicationStarted());
}

if (!isProduction && module.hot) {
  module.hot.accept('./configureStore', () => {
    if (isMainWindow) {
      // tslint:disable-next-line:no-console
      console.warn('HMR deteched for store. Reattaching store to window.');
      window.store = require('./configureStore').default(window.store.getState());
    }
  });
}

// Render the window as soon as the DOM is ready.
document.addEventListener('DOMContentLoaded', async () => {
  window.addEventListener('dragenter', preventDragAndDrop);
  window.addEventListener('dragover', preventDragAndDrop);
  window.addEventListener('drop', preventDragAndDrop);

  const { fin } = window;

  if (fin) {
    const finWindow = fin.desktop.Window.getCurrent();
    setupReactCleanUp(finWindow);
  }

  renderWindow(Router);

  if (fin) {
    fin.desktop.main(() => {
      const finWindow = fin.desktop.Window.getCurrent();
      const { name, uuid } = finWindow;
      const action = openfinReady(name);
      const { dispatch } = window.store || window.opener.store;
      dispatch(action);

      deregister({ name, uuid })
        // tslint:disable-next-line:no-console
        .then(() => console.log(`Deregistering ${name} from Layouts service.`))
        // tslint:disable-next-line:no-console
        .catch(err => console.log(`${name} has already been deregistred from Layouts service. Service returned the following error: ${err}`));
    });
  }
});
