import React, { Component, Fragment } from 'react'
import { Card, List, Steps, Button, Icon, Divider, Modal } from 'antd'
import MessengerPlugin from 'react-messenger-plugin'
import adBlocker from 'just-detect-adblock'
import ProfileForm from './ProfileForm'
import AddSkill from './skill/AddSkill'
import EditableSkill from './skill/EditableSkill'
import SkillEnum from '../../../skills.json'
import SkillTag from './SkillTag'

const { Step } = Steps

const styles = {
  head: {
    color: 'blue',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  show: {
    display: 'block',
  },
  hide: {
    display: 'none',
  },
  stepContainer: {
    width: '100%',
    height: '500px',
    padding: '0 20px',
    boxSizing: 'border-box',
  },
}

class Registration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      userSkills: [],
      newUserData: null,
      skillList: [],
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.saveFormRef = this.saveFormRef.bind(this)
    this.addSkill = this.addSkill.bind(this)
    this.removeSkill = this.removeSkill.bind(this)
    this.updateSkill = this.updateSkill.bind(this)
    this.fetchSkillList = this.fetchSkillList.bind(this)
    this.next = this.next.bind(this)
    this.prev = this.prev.bind(this)
  }

  componentDidMount() {
    if (adBlocker.isDetected()) {
      Modal.warning({
        title: 'AdBlock Detected',
        content: 'Please disable AdBlock on this page to ensure full use of our service :) Thank you',
      })
    }
    window.fbAsyncInit = function () {
      FB.init({
        appId: '162438851007010',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v2.12',
      })
      FB.Event.subscribe('send_to_messenger', (e) => {
        console.log(e)
        if (e.event === 'opt_in') {
          this.setState({ current: 1 })
        }
      })
    }.bind(this)

    this.fetchSkillList()
    const { updateUserFromStackleague, user: { facebookId } } = this.props
    updateUserFromStackleague(facebookId)
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState.skillList) !== JSON.stringify(this.state.skillList)) {
      this.fetchSkillList()
    } else if (JSON.stringify(prevState.userSkills) !== JSON.stringify(this.state.userSkills)) {
      this.fetchSkillList()
    }
  }

  fetchSkillList() {
    const { userSkills } = this.state
    let skillList = SkillEnum.map(skill => skill.name)
    if (userSkills && userSkills.length !== 0) {
      const skills = userSkills.map(skill => skill.name)
      skillList = skillList.filter(skillItem => !skills.includes(skillItem))
    }
    skillList = skillList.sort()
    this.setState({ skillList })
  }

  next() {
    if (this.state.current === 1) {
      const { form } = this.formRef.props
      form.validateFields((err, values) => {
        if (!err) {
          const current = this.state.current + 1
          this.setState({ current, newUserData: values })
        }
      })
    } else {
      const current = this.state.current + 1
      this.setState({ current })
    }
  }

  prev() {
    const current = this.state.current - 1
    this.setState({ current })
  }

  async handleSubmit() {
    const { updateUser, userId, createSkills } = this.props
    const { userSkills } = this.state
    await createSkills(userSkills)
    await updateUser(userId, this.state.newUserData)
  }

  saveFormRef(formRef) {
    this.formRef = formRef
  }

  addSkill(skill) {
    const { userSkills } = this.state
    const { userId } = this.props
    const newSkill = { ...skill, ownerId: userId }
    const newSkills = [...userSkills, newSkill]
    this.setState({ userSkills: newSkills })
  }

  removeSkill(index) {
    const { userSkills, skillList } = this.state
    const skill = userSkills[index]
    const updatedSkills = [...userSkills.slice(0, index), ...userSkills.slice(index + 1, userSkills.length)]
    const newSkillList = [...skillList, skill.name]
    this.setState({ userSkills: updatedSkills, skillList: newSkillList })
  }

  updateSkill(index, updatedSkill) {
    const { userSkills } = this.state
    const updatedSkills = [...userSkills.slice(0, index), updatedSkill, ...userSkills.slice(index + 1, userSkills.length)]
    this.setState({ userSkills: updatedSkills })
  }

  render() {
    const { current, userSkills, skillList } = this.state
    const { user, userId } = this.props
    const skills = [{ name: 'PHP' }, { name: 'JavaScript' }, { name: 'Go' }, { name: 'Hack' }, { name: 'Lua' }]
    const renderCurrentState = () => {
      if (current === 0) {
        return (<MessengerPlugin
          appId="162438851007010"
          pageId="1597017670604747"
          passthroughParams={userId}
          size="large"
        />)
      } else if (current === 1) {
        return (<ProfileForm
          user={user}
          wrappedComponentRef={this.saveFormRef}
        />)
      } else if (current === 2) {
        return (
          <Fragment >
            <div>
              {skills && skills.map(skill => <SkillTag skill={skill} addSkill={this.addSkill}>{skill.name}</SkillTag>)}
            </div>
            <List
              dataSource={[...userSkills]}
              renderItem={(item, index) => (
                <EditableSkill
                  skill={item}
                  index={index}
                  removeSkill={this.removeSkill}
                  updateSkill={this.updateSkill}
                />
              )}
            />
            <AddSkill
              addSkill={this.addSkill}
              skillList={skillList}
            />
          </Fragment>
        )
      }
      return null
    }

    return (
      <div className="step-create-body create-container" >
        <Card style={{ width: '100%', height: '100%', textAlign: 'center' }}>
          <div className="hide-on-mobile">
            <Steps direction="horizontal" current={current} size="small">
              <Step
                title="Connect Messenger"
                icon={<Icon type="message" />}
                description="Enable notifications"
              />
              <Step
                title="Basic Info"
                icon={<Icon type="idcard" />}
                description="Add your details"
              />
              <Step
                title="Add Skills"
                icon={<Icon type="plus-circle-o" />}
                description="List your skills"
              />
            </Steps>
          </div>
          <div className="show-on-mobile">
            <Steps direction="horizontal" current={current} size="small">
              {current === 0 && <Step
                title="Connect Messenger"
                icon={<Icon type="message" />}
              />}
              {current === 1 && <Step
                title="Basic Info"
                icon={<Icon type="idcard" />}
              />}
              {current === 2 && <Step
                title="Add Skills"
                icon={<Icon type="plus-circle-o" />}
              />}
            </Steps>
          </div>
          <div style={styles.stepContainer}>
            <div className="hide-on-mobile">
              <Divider> Complete your profile </Divider>
            </div>
            {renderCurrentState()}
          </div>
          <div className="steps-action" style={this.state.current === 0 ? { marginLeft: '32px' } : { marginLeft: '36px' }}>
            {
              this.state.current > 0 &&
              <Button onClick={() => this.prev()}>
                Previous
              </Button>
            }
            {
              this.state.current === 1 &&
              <Button type="primary" style={{ marginLeft: 4 }} onClick={this.next}>Next</Button>
            }
            {
              this.state.current === 2 &&
              <Button type="primary" style={{ marginLeft: 4 }} onClick={this.handleSubmit}>Submit</Button>
            }
          </div>
        </Card>
      </div>
    )
  }
}

export default Registration
