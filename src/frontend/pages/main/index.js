import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import NotificationTab from './notificationTab'
import SearchTab from './searchTab'
import SuggestionTab from './suggestionTab'
import ConnectionTab from './connectionTab'
import NotificationPopup from '../../components/notificationPopup'
import { removeConnectionLocally, getUserRequests } from '../../actions/userActions'
import client from '../../client'
import ProfileCard from './profileCard/index'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      display: 0,
    }

    this.setDisplayView = this.setDisplayView.bind(this)
    this.redirectToSearch = this.redirectToSearch.bind(this)
    this.parseUrlFilter = this.parseUrlFilter.bind(this)
  }

  componentDidMount() {
    const {
      user, removeConnection, getRequests, location,
    } = this.props

    getRequests(user._id, 0, this.parseUrlFilter(location.search))

    // updates the redux store on removal of connection between two users
    client.service('api/requests').on('removed', (res) => {
      if (res.type === 'CONNECT_USER') {
        if (res.recipient === user._id) {
          removeConnection(res.sender)
        } else if (res.sender === user._id) {
          removeConnection(res.recipient)
        }
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    const { user, getRequests, location } = nextProps
    if (nextProps.location.search !== this.props.location.search) {
      getRequests(user._id, 0, this.parseUrlFilter(location.search))
    }
  }

  componentWillUnmount() {
    client.service('api/requests').removeListener('removed')
  }

  setDisplayView(n) {
    this.setState({ display: n })
  }

  parseUrlFilter(url) {
    if (url) {
      const split = url.split('=')
      return split[1]
    }
    return null
  }

  redirectToSearch() {
    const { history } = this.props
    history.push('/search')
  }

  render() {
    const { display } = this.state
    const {
      networkConnections, requestsReceivedLength, isFetching, location,
    } = this.props
    return (
      <div className="container main-container">
        <NotificationPopup />
        <Col lg={1} />
        <Row className="main-top">
          <Col sm={24} md={24} lg={24}>
            <div className="show-on-mobile">
              <SearchTab redirectToSearch={this.redirectToSearch} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={1} />
          <Col sm={24} md={8} lg={5}>
            <ProfileCard
              networkConnections={networkConnections}
              requestsReceivedLength={requestsReceivedLength}
              isFetching={isFetching}
              setDisplayView={this.setDisplayView}
            />
          </Col>
          <Col sm={24} md={16} lg={17}>
            <div className="hide-on-mobile">
              <SearchTab redirectToSearch={this.redirectToSearch} />
            </div>
            {display === 0 && <div><ConnectionTab isFetching={isFetching} /></div>}
            {display === 1 && <div><NotificationTab location={location} parseUrlFilter={this.parseUrlFilter} /></div>}
            {display === 3 && <div><SuggestionTab /></div>}
          </Col>
          <Col lg={1} />
        </Row>
        <Col lg={1} />
      </div >
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  networkConnections: state.user.networkConnections,
  isFetching: state.user.isNetworkConnectionsFetching,
  requestsReceivedLength: state.user.requestsReceivedLength,
})

const mapDispatchToProps = dispatch => ({
  removeConnection: requestId => dispatch(removeConnectionLocally(requestId)),
  getRequests: (userId, skip, filter) => dispatch(getUserRequests(userId, skip, filter)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
