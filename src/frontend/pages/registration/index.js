import { connect } from 'react-redux'
import Registration from './Registration'
import { updateUserData, fethUserDataFromStackleague } from '../../actions/userActions'
import { createSkill } from '../../actions/skillActions'

const mapStateToProps = state => ({
  userId: state.user.user._id,
  user: state.user.user,
  web3: state.web3.web3,
  contract: state.web3.contract,
})

const mapDispatchToProps = dispatch => ({
  updateUser: (id, data) => dispatch(updateUserData(id, data)),
  updateUserFromStackleague: facebookId => dispatch(fethUserDataFromStackleague(facebookId)),
  createSkills: skills => dispatch(createSkill(skills)),
})

const RegistrationContainer = connect(mapStateToProps, mapDispatchToProps)(Registration)
export default RegistrationContainer
