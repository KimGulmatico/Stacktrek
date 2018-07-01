import { connect } from 'react-redux'
import ProfileForm from './ProfileForm'
import { updateUserData } from '../../../actions/userActions'
import { createSkill } from '../../../actions/skillActions'

const mapStateToProps = state => ({
  user: state.user.user,
  skills: state.skills.skills,
})

const mapDispatchToProps = dispatch => ({
  updateUser: (id, data) => dispatch(updateUserData(id, data)),
  createSkill: skill => dispatch(createSkill(skill)),
})

const FormContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileForm)

export default FormContainer
