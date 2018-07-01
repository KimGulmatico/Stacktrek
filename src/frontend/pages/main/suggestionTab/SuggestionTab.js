import React, { Component, Fragment } from 'react'
import { Row, Col } from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import SuggestedUser from '../../../components/suggestedUser'
import { querySuggestions } from '../../../actions/userActions'

class SuggestionTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      skipQuery: 0,
      suggestions: [],
      hasMore: true,
    }

    this.handleInfiniteLoad = this.handleInfiniteLoad.bind(this)
  }

  async handleInfiniteLoad() {
    const {
      user, networkConnections, safePromise,
    } = this.props

    const excluded = [user._id, ...networkConnections.map(o => o._id)]
    const result = safePromise(await querySuggestions(excluded, this.state.skipQuery))

    if (result) {
      this.setState({ suggestions: [...this.state.suggestions, ...result.data], skipQuery: this.state.skipQuery + 8 })

      if (result.data.length === 0) {
        this.setState({ hasMore: false })
      }
    }
  }

  render() {
    const { connectToUser, user } = this.props
    const { suggestions } = this.state
    const placeHolders = [{ _id: 1 }, { _id: 2 }, { _id: 3 }, { _id: 4 }]
    const name = `${user.firstname} ${user.lastname}`
    return (
      <Fragment>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.handleInfiniteLoad}
          hasMore={this.state.hasMore}
          useWindow={false}
          loader={
            <Fragment key="1"> {placeHolders.map(suggestion => <Col xs={24} sm={12} md={8} lg={6} xl={6} key={suggestion._id}><SuggestedUser loading suggestion={suggestion} /></Col>)}</Fragment>
          }
        >
          <Row gutter={8}>
            {(suggestions && suggestions.length !== 0) && suggestions.map(suggestion => (
              <Col xs={24} sm={12} md={8} lg={6} xl={6} key={suggestion._id} >
                <SuggestedUser
                  suggestion={suggestion}
                  connectToUser={() => connectToUser(user._id, name, suggestion._id, user.facebookId, suggestion.facebookId)}
                  requestedUsers={user.requestedUsers}
                />
              </Col>
            ))}
          </Row>
        </InfiniteScroll>
      </Fragment>
    )
  }
}

export default SuggestionTab
