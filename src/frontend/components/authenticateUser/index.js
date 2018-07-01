import React from 'react'
import { connect } from 'react-redux'
import { authenticate as authenticateFunc } from '../../actions/userActions'

// this component is used for getting authenticated user entity
class AuthUser extends React.Component {
  async componentDidMount() {
    const { authenticate } = this.props
    authenticate()
  }

  render() {
    return (
      <div />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  authenticate: () => dispatch(authenticateFunc()),
})

const AuthUserContainer = connect(undefined, mapDispatchToProps)(AuthUser)

export default AuthUserContainer
