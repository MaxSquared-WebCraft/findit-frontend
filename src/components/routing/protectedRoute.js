import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { PATH_LOGIN } from '../../routes'
import AppView from './appView'

const ProtectedRoute = ({ component: Comp, props: componentProps, ...rest }) => {

  const renderComponent = (props) => {

    const { user } = componentProps || {}

    return user ?
      <AppView><Comp {...props} {...componentProps} /></AppView> :
      <Redirect to={PATH_LOGIN}/>
  }

  return (<Route {...rest} render={renderComponent}/>)
}

ProtectedRoute.propTypes = {
  props: PropTypes.any,
  component: PropTypes.any,
}

export default ProtectedRoute