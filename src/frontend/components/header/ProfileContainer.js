import { connect } from 'react-redux'
import Profile from './Profile'
import { logout as logoutFunc } from '../../actions/userActions'

const mapStateToProps = state => ({
  user: state.user.user,
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutFunc()),
})

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile)

export default ProfileContainer

