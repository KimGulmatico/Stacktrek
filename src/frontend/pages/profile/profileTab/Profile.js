import React, { Component } from 'react'
import { Layout, Row, Col, message } from 'antd'
import Bio from './Bio'
import Skills from './Skills'
import Experience from './Experiences'
import Certificate from './Certificates'
import Accounts from './Accounts'
import client from '../../../client'
import Spinner from '../../../components/spinner'

message.config({
  duration: 2,
  maxCount: 1,
  top: 15,
})

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.user,
    }

    this.endorse = this.endorse.bind(this)
    this.success = this.success.bind(this)
    this.error = this.error.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onUserValuesChange = this.onUserValuesChange.bind(this)
    this.saveInfoRef = this.saveInfoRef.bind(this)
  }

  componentDidMount() {
    if (this.props.user) {
      this.props.getConnections(this.props.user._id)
    }
  }

  componentDidUpdate(nextProps) {
    if (nextProps.userId !== this.props.userId && this.props.userId) {
      this.props.getConnections(this.props.userId)
    }
  }

  onUserValuesChange(value) {
    const newUser = { ...this.state.user, ...value }
    this.setState({ user: newUser })
  }

  saveInfoRef(ref) {
    this.formRef = ref
  }

  error(error) {
    console.log(error)
    if (error.toString().includes('This is a duplicate request.')) {
      message.error('You already sent a request to this user')
    } else {
      message.error('There was an error in sending the request')
    }
  }

  success() {
    message.success('Sent an endorsement request')
  }

  updateSuccess() {
    message.success('Profile has been updated', 3)
  }

  async endorse(endorser, skill) {
    const { user } = this.props
    const requestService = await client.service('api/requests')
    const recipient = JSON.parse(endorser)
    if (endorser) {
      try {
        await requestService.create({
          type: 'ATTEST_SKILL',
          status: 'PENDING',
          sender: user._id,
          recipient: recipient._id,
          senderName: `${user.firstname} ${user.lastname}`,
          recipientFBID: recipient.facebookId,
          senderFBID: user.facebookId,
          data: skill,
        })
        this.success()
      } catch (e) {
        this.error(e)
      }
    } else {
      console.log('no endorser')
    }
  }

  handleSubmit() {
    const { form } = this.formRef.props
    form.validateFields(async (err, values) => {
      if (!err) {
        const { user } = this.state
        const newUser = { ...user, ...values }
        if (JSON.stringify(this.state.backupUser) !== JSON.stringify(newUser)) {
          await this.props.updateUser(user._id, newUser)
        }
        this.updateSuccess()
      } else {
        console.log(err)
      }
    })
  }

  render() {
    try {
      const {
        user, network, getFBId, skills, skillsIsFetching, contract, fetchAttestors,
      } = this.props
      if (!user) return (<Spinner />)
      return (
        <Layout className="container">
          <Row>
            <Bio
              bio={user && user.bio}
              loading={!user}
              user={user}
              onSubmit={this.handleSubmit}
              onUserValuesChange={this.onUserValuesChange}
              saveInfoRef={this.saveInfoRef}
            />
          </Row>
          <Row>
            <Col sm={24} lg={24}>
              <Skills
                user={user}
                skills={skills || []}
                network={(network && (network.length !== 0)) ? network : []}
                onEndorse={this.endorse}
                loading={skillsIsFetching}
                getFBId={getFBId}
                contract={contract}
                fetchAttestors={fetchAttestors}
              />
            </Col>
            <Col sm={24} lg={24}>
              <Experience
                loading={!user}
                user={user}
              />
            </Col>
            <Col sm={24} lg={24}>
              <Certificate />
            </Col>
          </Row>
          <Accounts fblink={user.facebookLink} />
        </Layout>
      )
    } catch (e) {
      console.log(e)
      return null
    }
  }
}

export default Profile
