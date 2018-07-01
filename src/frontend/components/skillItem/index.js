import promisify from '../promisify'
import SkillItem from './SkillItem'

const SkillContainer = props => promisify(SkillItem)(props)

export default SkillContainer

