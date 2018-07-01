import React, { Component, Fragment } from 'react'
import { List, Card, Divider, Button, message } from 'antd'
import EditableExperience from './experience/EditableExperience'
import EditableSkill from './skill/EditableSkill'
import AddExperience from './experience/AddExperience'
import AddSkill from './skill/AddSkill'
import AddInfo from './info/AddInfo'
import SkillEnum from '../../../../skills.json'

class ProfileForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user,
      skills: this.props.skills,
      backupUser: this.props.user,
      backupSkills: this.props.skills,
      isUpdating: false,
      skillList: [],
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.saveInfoRef = this.saveInfoRef.bind(this)
    this.addSkill = this.addSkill.bind(this)
    this.addWorkExperience = this.addWorkExperience.bind(this)
    this.removeSkill = this.removeSkill.bind(this)
    this.removeWorkExperience = this.removeWorkExperience.bind(this)
    this.updateSkill = this.updateSkill.bind(this)
    this.updateWorkExperience = this.updateWorkExperience.bind(this)
    this.updateSuccess = this.updateSuccess.bind(this)
    this.resetState = this.resetState.bind(this)
    this.onUserValuesChange = this.onUserValuesChange.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
      if (JSON.stringify(this.props.skills) !== JSON.stringify(prevProps.skills)) {
        this.fetchSkillList()
      }
      if (!this.props.skills) {
        this.fetchSkillList()
      }
      if (prevProps.user !== this.props.user) {
        this.setState({ user: this.props.user, backupUser: this.props.user })
      } else if (prevProps.skills !== this.props.skills) {
        this.fetchSkillList()
        this.setState({ skills: this.props.skills, backupSkills: this.props.skills })
      }
    }
  }

  onUserValuesChange(value) {
    const newUser = { ...this.state.user, ...value }
    this.setState({ user: newUser })
  }

  get hasUserChanged() {
    return JSON.stringify(this.state.user) !== JSON.stringify(this.state.backupUser)
  }

  get hasSkillsChanged() {
    return JSON.stringify(this.state.skills) !== JSON.stringify(this.state.backupSkills)
  }

  fetchSkillList(newSkill = undefined) {
    const userSkills = this.props.skills
    let skillList = SkillEnum.map(skill => skill.name)
    if (userSkills && userSkills.length !== 0) {
      if (newSkill) {
        userSkills.push(newSkill)
      }
      const skills = userSkills.map(skill => skill.name)
      skillList = skillList.filter(skillItem => !skills.includes(skillItem))
    }
    skillList = skillList.sort()
    this.setState({ skillList })
  }

  resetState() {
    this.setState({ user: this.state.backupUser })
    this.setState({ skills: this.state.backupSkills })
    this.formRef.props.form.resetFields()
  }

  handleSubmit() {
    const { form } = this.formRef.props
    this.setState({ isUpdating: true })
    form.validateFields(async (err, values) => {
      if (!err) {
        const { user, skills, backupSkills } = this.state
        const newUser = { ...user, ...values }
        const filteredSkills = skills.filter(skill => !backupSkills.includes(skill))

        if (this.hasUserChanged) {
          await this.props.updateUser(user._id, newUser)
        }

        if (this.hasSkillsChanged) {
          await this.props.createSkill(filteredSkills)
        }

        this.updateSuccess()
        this.setState({ backupUser: newUser, backupSkills: [...backupSkills, ...filteredSkills] })
      } else {
        console.log(err)
      }
    })
    this.setState({ isUpdating: false })
  }

  saveInfoRef(ref) {
    this.formRef = ref
  }

  addSkill(skill) {
    const { user: { _id }, skills } = this.state
    const newSkill = { ...skill, ownerId: _id }
    const newSkills = [...skills, newSkill]
    this.setState({ skills: newSkills })
    this.fetchSkillList(skill)
  }

  removeSkill(index) {
    const { skills, skillList } = this.state
    const updatedSkills = [...skills.slice(0, index), ...skills.slice(index + 1, skills.length)]
    const skill = skills[index]
    const newSkillList = [...skillList, skill.name]
    this.setState({ skills: updatedSkills, skillList: newSkillList })
  }

  updateSkill(index, updatedSkill) {
    const { skills, user: { _id } } = this.state
    const skill = { ...updatedSkill, ownerId: _id }
    const updatedSkills = [...skills.slice(0, index), skill, ...skills.slice(index + 1, skills.length)]
    this.setState({ skills: updatedSkills })
  }

  addWorkExperience(workExperience) {
    const { user } = this.state
    const workExperiences = user.experiences ? user.experiences : []
    const newUser = { ...user, experiences: [...workExperiences, workExperience] }
    this.setState({ user: newUser })
  }

  removeWorkExperience(index) {
    const { user, user: { experiences: e } } = this.state
    const updatedExperiences = [...e.slice(0, index), ...e.slice(index + 1, e.length)]
    const newUser = { ...user, experiences: updatedExperiences }
    this.setState({ user: newUser })
  }

  updateWorkExperience(index, updatedWorkExperience) {
    const { user, user: { experiences: e } } = this.state
    const updatedExperiences = [...e.slice(0, index), updatedWorkExperience, ...e.slice(index + 1, e.length)]
    const newUser = { ...user, experiences: updatedExperiences }
    this.setState({ user: newUser })
  }

  updateSuccess() {
    message.success('Profile has been updated', 3)
  }

  render() {
    const {
      user, skills, skillList, backupSkills,
    } = this.state
    return (
      <Fragment>
        <Card title="Basic Info" loading={!user}>
          {user &&
            <AddInfo
              wrappedComponentRef={this.saveInfoRef}
              firstname={user.firstname}
              lastname={user.lastname}
              email={user.email}
              bio={user.bio}
              school={user.school}
              contactNumber={user.contactNumber}
              onUserValuesChange={this.onUserValuesChange}
            />
          }
        </Card>
        <Card title="Skills" loading={!skills}>
          {skills &&
            <Fragment>
              <List
                dataSource={skills}
                renderItem={(item, index) => (
                  <EditableSkill
                    skill={item}
                    index={index}
                    removeSkill={this.removeSkill}
                    updateSkill={this.updateSkill}
                    backupSkills={backupSkills}
                  />
                )}
              />
              <AddSkill
                skillList={skillList}
                addSkill={this.addSkill}
              />
            </Fragment>
          }
        </Card>
        <Card title="Work Experience" loading={!user}>
          {user &&
            <Fragment>
              <List
                dataSource={user.experiences}
                renderItem={(item, index) => (
                  <EditableExperience
                    item={item}
                    index={index}
                    removeWorkExperience={this.removeWorkExperience}
                    updatedWorkExperience={this.updateWorkExperience}
                  />
                )}
              />
              <AddExperience
                experiences={user.experiences}
                addWorkExperience={this.addWorkExperience}
              />
            </Fragment>
          }
        </Card>
        <Card loading={!user}>
          <Divider orientation="right"> Edit Profile </Divider>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {(this.hasSkillsChanged || this.hasUserChanged) &&
              <Button
                style={{ margin: '0 5px' }}
                onClick={this.resetState}
              > Reset Changes
              </Button>
            }
            <Button
              loading={this.state.isUpdating}
              style={{ margin: '0 5px' }}
              type="primary"
              onClick={this.handleSubmit}
              disabled={(!this.hasSkillsChanged && !this.hasUserChanged)}
            >
              {this.state.isUpdating ? 'Updating' : 'Save Changes'}
            </Button>
          </div>
        </Card>
      </Fragment>
    )
  }
}

export default ProfileForm
