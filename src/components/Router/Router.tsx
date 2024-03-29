import * as React from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { ROUTES } from './consts';
import { AppRoute, routes } from './routes';

import { GlobalStyle } from '../../styles/globals.css';
import ConnectedThemeProvider from '../ConnectedThemeProvider';

const renderNestedRoute = (Component, children) => props => {
  return <Component {...props}>{children.map(renderRoute)}</Component>;
};

export const renderRoute = ({ children, Component, exact, path }: AppRoute) => {
  const routePath = path === ROUTES.HOME ? [path, '/index.html'] : path;

  if (!children) {
    return <Route key={path} component={Component} exact={exact} path={routePath} />;
  }

  return <Route key={path} exact={exact} path={routePath} render={renderNestedRoute(Component, children)} />;
};

const Router = () => (
  <DragDropContextProvider backend={HTML5Backend}>
    <ConnectedThemeProvider>
      <>
        <GlobalStyle />

        <BrowserRouter>
          <Switch>{routes.map(renderRoute)}</Switch>
        </BrowserRouter>
      </>
    </ConnectedThemeProvider>
  </DragDropContextProvider>
);

export default Router;
