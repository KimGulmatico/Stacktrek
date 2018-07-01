import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Layout, Spin } from 'antd'

import LoadableComp from './util/LoadableComp'
import Spinner from './components/spinner'
import PrivateRoute from './util/PrivateRoute'

const { Content } = Layout
const ViewProfile = LoadableComp(() => import('./pages/viewProfile/index'))
const Search = LoadableComp(() => import('./pages/search/index.js'))
const Home = LoadableComp(() => import('./pages/landing/index.js'))
const CreateGroup = LoadableComp(() => import('./pages/group/CreateGroup.js'))
const Events = LoadableComp(() => import('./pages/event/event/Events.js'))
const EventPage = LoadableComp(() => import('./pages/event/index.js'))
const Profile = LoadableComp(() => import('./pages/profile/index.js'))
const Register = LoadableComp(() => import('./pages/registration/index.js'))
const ErrorPage = LoadableComp(() => import('./pages/error/index.js'))
const Main = LoadableComp(() => import('./pages/main/index'))

const Routes = ({ user, isProfileComplete, isAuthenticating }) => {
  function renderHome() {
    if (isAuthenticating) {
      return Spinner // Put a loader here or something
    } else if (user && isProfileComplete) {
      return Main
    } else if (user && !isProfileComplete) {
      return Register
    } else {
      return Home
    }
  }

  return (
    <Content style={{ minHeight: 'calc(100vh - 64px)' }}>
      <Switch>
        <Route exact path="/" component={renderHome()} />
        <Route exact path="/search" component={user ? Search : Spinner} />
        <PrivateRoute
          exact
          path="/profile/:tab?"
          component={isProfileComplete && Profile}
          isAuthenticated={!!user}
          isAuthenticating={isAuthenticating} />
        <Route
          exact path="/user/:params"
          component={ViewProfile}
        />
        <PrivateRoute
          exact path="/create-group"
          component={CreateGroup}
          isAuthenticated={!!user}
          isAuthenticating={isAuthenticating}
        />
        <PrivateRoute
          exact path="/register"
          component={Register}
          isAuthenticated={!!user}
          isAuthenticating={isAuthenticating}
        />
        <Route exact path="/events" component={EventPage} />
        <Route component={ErrorPage} />
      </Switch>
    </Content>
  )
}

const mapStateToProps = state => ({
  user: state.user.user,
  isProfileComplete: state.user.isProfileComplete,
  isAuthenticating: state.user.isAuthenticating
})

const RoutesContainer = connect(mapStateToProps, null, null, { pure: false })(Routes)

export default RoutesContainer
