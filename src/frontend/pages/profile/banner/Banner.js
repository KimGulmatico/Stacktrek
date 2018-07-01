import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'
import { Row, Col, Button } from 'antd'
import ProfilePicture from '../../../components/profilePicture'
import Details from './Details'
import { getUserConnections, sendConnectRequest, fetchStackleagueAchievements } from '../../../actions/userActions'
import Badge from './Badge'
import promisify from '../../../components/promisify'

class Banner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requestStatus: null,
      achievements: null,
    }
    this.connectToUser = this.connectToUser.bind(this)
  }

  async componentDidMount() {
    const {
      getConnections, currentUser, fetchAchievements, user,
      safePromise, safeSetState,
    } = this.props

    if (currentUser) {
      safeSetState(() => getConnections(currentUser._id))
    }

    const achievements = safePromise(await fetchAchievements(user.facebookId))
    safeSetState(() => this.setState({ achievements }))
  }

  async connectToUser(userId) {
    const { connectToUser } = this.props
    this.setState({ requestStatus: 'SENDING' })
    try {
      await connectToUser(userId)
      this.setState({ requestStatus: 'SUCCESS' })
    } catch (e) {
      this.setState({ requestStatus: 'FAILED' })
    }
  }

  render() {
    const {
      user, currentUserNetwork, connectToUser, currentUser, userExists,
    } = this.props
    const { requestStatus, achievements } = this.state
    let status = ''
    let requested = null
    let connected = null
    if (currentUser && (user._id !== currentUser._id)) {
      requested = currentUser.requestedUsers && currentUser.requestedUsers.includes(user._id)
      let connections = []
      if (currentUserNetwork) {
        connections = currentUserNetwork.map(a => a._id)
      }
      connected = connections.includes(user._id)
      status = 'Connect'
      if (requestStatus === 'FAILED') {
        status = 'Failed'
      } else if (requestStatus === 'SUCCESS' || requested) {
        status = 'Sent'
      } else if (requestStatus === 'SENDING') {
        status = 'Sending'
      } else if (user._id === currentUser._id) {
        status = 'You'
      } else if (connected) {
        status = 'Connected'
      }
    }
    return (
      <div>
        <Row
          type="flex"
          align="middle"
          justify="center"
          className="background"
        >
          <Col style={{ marginRight: '10px' }} sm={4} md={4} lg={4}>
            <ProfilePicture facebookId={user.facebookId} width="125px" height="125px" />
          </Col>

          <Col style={{ paddingLeft: '5px' }} sm={19} md={19} lg={19}>
            <Details firstname={user.firstname} lastname={user.lastname} bio="" company={user.company && user.company} school={user.school} email={user.email} contactNumber={user.contactNumber} />
            <div>
              {
                achievements &&
                achievements.map((s) => {
                  if (s.proxorRating) {
                    return (
                      <div key={uuidv4()} style={{ display: 'inline-flex' }}>
                        <Badge title={s.title} rating={s.proxorRating} />
                      </div>
                    )
                  }
                  return null
                })
              }
            </div>
          </Col>
          <Col span={24}>
            <div className="connect-btn-container">
              {
                userExists &&
                <Fragment>
                  {(currentUser && (user._id !== currentUser._id)) &&
                    <Button
                      type="primary"
                      onClick={() => { connectToUser(currentUser._id, `${currentUser.firstname} ${currentUser.lastname}`, user._id, currentUser.facebookId, user.facebookId) }}
                      loading={requestStatus === 'SENDING'}
                      disabled={requestStatus === 'SUCCESS' || requested || user._id === currentUser._id || connected}
                    >
                      {status}
                    </Button>}
                </Fragment>
              }
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

const PromisifiedBanner = props => promisify(Banner)(props)

const mapStateToProps = state => ({
  currentUser: state.user.user,
  currentUserNetwork: state.user.networkConnections,
})

const mapDispatchToProps = dispatch => ({
  getConnections: id => dispatch(getUserConnections(id)),
  connectToUser: (senderId, name, recipientId, senderFBID, recipientFBID) => dispatch(sendConnectRequest(senderId, name, recipientId, senderFBID, recipientFBID)),
  fetchAchievements: facebookId => dispatch(fetchStackleagueAchievements(facebookId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PromisifiedBanner)
