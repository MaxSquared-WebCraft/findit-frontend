import React from 'react'
import { Route, Switch } from 'react-router-dom'
import asyncComponent from './components/routing/asyncComponent';
import PublicRoute from './components/routing/publicRoute';
import ProtectedRoute from './components/routing/protectedRoute';

export const PATH_DASHBOARD = '/'
export const PATH_LOGIN = '/login'
export const PATH_LOGOUT = '/logout'

const AsyncLogin = asyncComponent(() => import('./pages/login'))
const AsyncLogout = asyncComponent(() => import('./pages/logout'))
const AsyncDashboard = asyncComponent(() => import('./pages/dashboard'))
const AsyncNotFound = asyncComponent(() => import('./pages/404'))

export default ({ store }) => {

  const { auth: { user } } = store.getState() || {}
  const props = { user }

  return (
    <Switch>
      <PublicRoute
        path={PATH_LOGIN}
        exact
        component={AsyncLogin}
        props={props}
      />
      <ProtectedRoute
        path={PATH_DASHBOARD}
        exact
        component={AsyncDashboard}
        props={props}
      />
      <ProtectedRoute
        path={PATH_LOGOUT}
        exact
        component={AsyncLogout}
        props={props}
      />
      <Route component={AsyncNotFound}/>
    </Switch>
  )
}