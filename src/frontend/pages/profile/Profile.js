import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import Banner from './banner'
import NavBar from './Navigation'
import MetamaskBanner from '../../components/metamaskBanner'
import { getSkills } from '../../actions/skillActions'
import NotificationPopup from '../../components/notificationPopup'

class Profile extends Component {
  componentDidMount() {
    const { userId, getUserSkills, safeSetState } = this.props
    if (userId) {
      safeSetState(getUserSkills(userId))
    }
  }

  componentDidUpdate(prevProps) {
    const { getUserSkills, userId, safeSetState } = this.props
    if (userId !== prevProps.userId) {
      safeSetState(getUserSkills(userId))
    }
  }

  render() {
    const { match, history } = this.props
    return (
      <Row style={{ marginTop: '2%' }}>
        <NotificationPopup />
        <Col lg={1} />
        <Col lg={22}>
          <MetamaskBanner />
          <Banner />
          <NavBar tab={match.params.tab} history={history} />
        </Col>
        <Col lg={1} />
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.user && state.user.user._id,
})

const mapDispatchToProps = dispatch => ({
  getUserSkills: userId => dispatch(getSkills(userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
