import React from 'react'
import { Switch } from 'react-router-dom'
import asyncComponent from './components/routing/asyncComponent';
import PublicRoute from './components/routing/publicRoute';
import ProtectedRoute from './components/routing/protectedRoute';

export const PATH_DASHBOARD = '/'
export const PATH_LOGIN = '/login'

const AsyncLogin = asyncComponent(() => import('./pages/login'))
const AsyncDashboard = asyncComponent(() => import('./pages/dashboard'))

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
    </Switch>
  )
}