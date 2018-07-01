import promisify from '../../components/promisify'
import Profile from './Profile'

const ProfileContainer = props => promisify(Profile)({ ...props })

export default ProfileContainer
