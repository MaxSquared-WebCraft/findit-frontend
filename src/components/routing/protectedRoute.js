import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Comp, props: componentProps, ...rest }) => {

  const renderComponent = (props) => {

    const { user } = componentProps || {}

    return user ?
      <Comp {...props} {...componentProps} /> :
      <Redirect to={`/login`}/>
  }

  return (<Route {...rest} render={renderComponent}/>)
}

ProtectedRoute.propTypes = {
  props: PropTypes.any,
  component: PropTypes.any,
  location: PropTypes.string,
}

export default ProtectedRoute