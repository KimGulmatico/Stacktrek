import ViewProfile from './ViewProfile'
import promisify from '../../components/promisify'

const ViewProfileContainer = props => promisify(ViewProfile)(props)

export default ViewProfileContainer
