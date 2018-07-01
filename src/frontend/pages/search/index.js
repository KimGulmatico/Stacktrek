import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Input, Divider, Icon, Row, Col } from 'antd'
import SuggestionTab from '../main/suggestionTab'
import SuggestedUser from '../../components/suggestedUser'
import NotificationPopup from '../../components/notificationPopup'
import client from '../../client'
import { sendConnectRequest, getUserConnections } from '../../actions/userActions'


const { Search } = Input

class SearchPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasSearched: false,
      searchResults: undefined,
      isSearching: false,
    }

    this.searchRef = React.createRef()
    this.focusSearch = this.focusSearch.bind(this)
    this.search = this.search.bind(this)
  }

  componentDidMount() {
    const { getConnections, user } = this.props
    this.focusSearch()
    getConnections(user._id)
  }

  focusSearch() {
    this.searchRef.current.focus()
  }

  async search(searchInput) {
    this.setState({ isSearching: true })
    if (searchInput === '') {
      const res = await client.service('users').find()
      this.setState({ searchResults: res.data })
    } else {
      const res = await client.service('users').find({ query: { $text: { $search: searchInput } }, paginate: false })
      this.setState({ searchResults: res })
    }
    this.setState({ hasSearched: true, isSearching: false })
  }

  render() {
    const { hasSearched, searchResults } = this.state
    const { connectToUser, user, networkConnections } = this.props
    const name = `${user.firstname} ${user.lastname}`

    return (
      <Fragment>
        <NotificationPopup />

        <div style={{
          width: '60vw', margin: 'auto', marginTop: '40px', minHeight: 'calc(100vh-64px)',
        }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <a href="/#" style={{ color: 'gray' }}>
              <Icon type="rollback" />
              {' '}Home
            </a>
            <Search
              placeholder="Search people by skill, jobs, location..."
              enterButton="Search"
              size="large"
              ref={this.searchRef}
              onPressEnter={e => this.search(e.target.value)}
              onSearch={e => this.search(e)}
            />
          </div>
          <Divider>
            <span style={{ color: 'gray' }}>
              Connect with people. Grow your network {' '}
              <Icon type="rocket" />
            </span>
          </Divider>
          {!hasSearched && <SuggestionTab />}
          {hasSearched &&
            <div className="padded-holder">
              <Divider>
                {this.state.isSearching ?
                  <Fragment>Searching... {' '} <Icon type="loading" /> </Fragment>
                  : 'Search Results'}

              </Divider>
              <Row gutter={8}>
                {(searchResults && searchResults.length !== 0) ? searchResults.map(res => (
                  <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                    <SuggestedUser
                      key={res._id}
                      suggestion={res}
                      connectToUser={() => connectToUser(user._id, name, res._id, user.facebookId, res.facebookId)}
                      requestedUsers={user.requestedUsers}
                      networkConnections={networkConnections.map(a => a._id)}
                      userId={user._id}
                    />
                  </Col>
                )) : <span style={{ fontWeight: '100' }}> No results found</span>
                }
              </Row>
            </div>
          }
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  networkConnections: state.user.networkConnections,
})

const mapDispatchToProps = dispatch => ({
  getConnections: id => dispatch(getUserConnections(id)),
  connectToUser: (senderId, name, recipientId, senderFBID, recipientFBID) => dispatch(sendConnectRequest(senderId, name, recipientId, senderFBID, recipientFBID)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
