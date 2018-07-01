import React, { Component } from 'react'
import { Card, Icon, List } from 'antd'
import { connect } from 'react-redux'
import SkillItem from '../../../components/skillItem'
import AddSkill from './AddSkill'
import SkillEnum from '../../../../skills.json'
import { createSkill } from '../../../actions/skillActions'

class SkillsTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      skillList: [],
      tempSkills: props.skills.slice(0, 8),
    }
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.saveRef = this.saveRef.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.addSkill = this.addSkill.bind(this)
    this.showMore = this.showMore.bind(this)
  }

  componentDidMount() {
    this.fetchSkillList()
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.skills) !== JSON.stringify(this.props.skills)) {
      this.fetchSkillList()
      this.setState({ tempSkills: this.props.skills.slice(0, 8) })
    }
  }

  showModal() {
    this.setState({ visible: true })
  }

  hideModal() {
    this.setState({ visible: false })
  }

  saveRef(ref) {
    this.formRef = ref
    this.props.saveSkillRef(ref)
  }

  handleSubmit() {
    this.hideModal()
    this.fetchSkillList()
  }

  async addSkill(skill) {
    skill.ownerId = this.props.user._id
    await this.props.createSkill(skill)
    this.fetchSkillList()
  }

  fetchSkillList() {
    let { skills } = this.props
    skills = skills.map(skill => skill.name)
    if (skills) {
      let skillList = SkillEnum.map(skill => skill.name)
      skillList = skillList.filter(skill => !skills.includes(skill))
      skillList.sort()
      this.setState({ skillList })
    }
  }

  showMore() {
    const { skills } = this.props
    const buffer = 8
    const size = this.state.tempSkills.length + buffer
    const tempSkills = skills.slice(0, size)
    if (this.state.tempSkills.length < skills.length) {
      console.log('showing more...')
      this.setState({ tempSkills })
    } else {
      console.log('showing less...')
      this.setState({ tempSkills: skills.slice(0, 8) })
    }
  }

  render() {
    const {
      loading, onEndorse, network, skills, contract, user, fetchAttestors,
    } = this.props
    const { tempSkills } = this.state
    return (
      <Card style={{ marginBottom: '1%' }} loading={loading}>
        <AddSkill
          skillList={this.state.skillList}
          addSkill={this.addSkill}
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.hideModal}
          createSkill={this.props.createSkill}
        />
        <div style={{ fontSize: '22px', marginBottom: '1%', borderBottom: '1px solid #c4c4c4' }}>Skills<Icon type="edit" onClick={this.showModal} /></div>
        <List
          dataSource={tempSkills}
          renderItem={skill =>
            (<SkillItem
              skill={skill}
              onEndorse={onEndorse}
              network={network}
              key={skill._id}
              contract={contract}
              ethAddress={user && user.ethAddress}
              fetchAttestors={fetchAttestors}
            />)
          }
        />
        <div className="text-center">
          {skills.length > 8 ? (<Icon
            type={tempSkills.length < skills.length ? 'down-circle-o' : 'up-circle-o'}
            onClick={this.showMore}
            className="view-button"
          />) : ''}
        </div>
      </Card>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createSkill: skill => dispatch(createSkill(skill)),
})

export default connect(null, mapDispatchToProps)(SkillsTab)

