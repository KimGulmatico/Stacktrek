import React from 'react'
import { Route } from 'react-router-dom'
import Spinner from '../components/spinner'
import Login from '../components/login'

function render(props, Component, isAuthenticated, isAuthenticating) {
  if (isAuthenticating) {
    return <Spinner />
    // return <Component {...props} />
  } else if (isAuthenticated) {
    return <Component {...props} />
  }
  return <Login />
}

const PrivateRoute = ({
  component: Component, isAuthenticated, isAuthenticating, ...rest
}) => (
  <Route
    {...rest}
    render={props => render(props, Component, isAuthenticated, isAuthenticating)}
  />
)

export default PrivateRoute
