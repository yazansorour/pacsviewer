import React from 'react';
import { Routes, Route,Navigate } from 'react-router-dom';
import { ErrorBoundary } from '@ohif/ui';

// Route Components
import DataSourceWrapper from './DataSourceWrapper';
import WorkList from './WorkList';
import Local from './Local';
import Debug from './Debug';
import NotFound from './NotFound';
import buildModeRoutes from './buildModeRoutes';
import PrivateRoute from './PrivateRoute';
import Loign from './Auth'


const notFoundRoute = { component: NotFound };
// TODO: Include "routes" debug route if dev build


const createRoutes = ({
  modes,
  dataSources,
  extensionManager,
  servicesManager,
  commandsManager,
  hotkeysManager,
  routerBasename,
  showStudyList,
}) => {
  const routes =
    buildModeRoutes({
      modes,
      dataSources,
      extensionManager,
      servicesManager,
      commandsManager,
      hotkeysManager,
    }) || [];

  const { customizationService } = servicesManager.services;
  const bakedInRoutes = [
    // WORK LIST
    {
      path: '/',
      children: DataSourceWrapper,
      private: true,
      props: { children: WorkList, servicesManager },
    },
    {
      path: '/debug',
      children: Debug,
    },
    {
      path: '/local',
      children: Local,
    },
  ];
  
  // NOT FOUND (404)
  const WorkListRoute = {
    path: '/',
    children: DataSourceWrapper,
    private: true,
    props: { children: WorkList, servicesManager },
  };

  const studiesRoute = {
    path: '/studies',
    children: DataSourceWrapper,
    private: true,
    props: { children: WorkList, servicesManager },
  };

  const loginRoute = {
    path: '/login',
    children: Loign,
    private: false,
  }

  const customRoutes = customizationService.getGlobalCustomization(
    'customRoutes'
  );
  const allRoutes = [
    ...routes,
    ...(showStudyList ? [WorkListRoute] : []),
    ...(customRoutes?.routes || []),
    ...bakedInRoutes,
    studiesRoute,
    loginRoute,
    customRoutes?.notFoundRoute || notFoundRoute,
  ];

  function RouteWithErrorBoundary({ route, ...rest }) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return (
      <ErrorBoundary context={`Route ${route.path}`} fallbackRoute="/">
        <route.children
          {...rest}
          {...route.props}
          route={route}
          servicesManager={servicesManager}
          hotkeysManager={hotkeysManager}
        />
      </ErrorBoundary>
    );
  }

  const { UserAuthenticationService } = servicesManager.services;
  const user: string = localStorage.getItem('token');
  // Note: PrivateRoutes in react-router-dom 6.x should be defined within
  // a Route element
  return (
    <Routes>
      {allRoutes.map((route, i) => {
        return route.private === true ? (
          <Route
            key={i}
            exact
            path={route.path}
            element={
              user != null ?
              <PrivateRoute
                handleUnauthenticated={
                  UserAuthenticationService.handleUnauthenticated
                }
              >
                <RouteWithErrorBoundary route={route} />
              </PrivateRoute> :
              <Navigate to="/login"></Navigate>
            }
          ></Route>
        ) : (
          <Route
            key={i}
            path={route.path}
            element={<RouteWithErrorBoundary route={route} />}
          />
        );
      })}
    </Routes>
  );
};

export default createRoutes;
