import { connect } from 'react-redux'
import Profile from './Profile'
import { getUserConnections, getFBId, updateUserData } from '../../../actions/userActions'
import { getExperiences } from '../../../actions/experienceActions'
import { getAttestors } from '../../../actions/contractActions'

const mapStateToProps = state => ({
  user: state.user.user,
  userId: state.user.user && state.user.user._id,
  network: state.user.networkConnections,
  skills: state.skills.skills,
  skillsIsFetching: state.skills.skillsIsFetching,
  experiences: state.experiences,
  contract: state.web3.contract,
})

const mapDispatchToState = dispatch => ({
  getConnections: id => dispatch(getUserConnections(id)),
  getFBId: id => dispatch(getFBId(id)),
  updateUser: (id, user) => dispatch(updateUserData(id, user)),
  getExperiences: id => dispatch(getExperiences(id)),
  fetchAttestors: (ethAddress, skillName) => (dispatch(getAttestors(ethAddress, skillName))),
})

const ProfileTabContainer = connect(mapStateToProps, mapDispatchToState)(Profile)

export default ProfileTabContainer
