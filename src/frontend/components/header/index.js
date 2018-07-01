import React from 'react'
import { connect } from 'react-redux'
import { Layout } from 'antd'
import Nav from './Nav'
import Profile from './ProfileContainer'

const { Header } = Layout

const PageHeader = ({ user, isAuthenticating, location }) => {
  if (user || isAuthenticating || location !== '#/') {
    return (
      <Header
        className="background-gradient-blue row space-between"
      >
        <Nav />
        <Profile />
      </Header >
    )
  }
  return null
}


const mapStateToProps = state => ({
  user: state.user.user,
  isAuthenticating: state.user.isAuthenticating,
})

export default connect(mapStateToProps)(PageHeader)
