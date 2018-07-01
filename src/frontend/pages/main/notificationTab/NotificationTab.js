import React, { Component } from 'react'
import { List, Spin } from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
import { queryRequestsReceived } from '../../../actions/userActions'
import RequestItem from './RequestItem'

const pagination = 6

class NotificationTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      skipQuery: pagination,
      hasMore: true,
      initialRequests: this.props.requests,
    }

    this.handleInfiniteLoad = this.handleInfiniteLoad.bind(this)
    this.handleApprove = this.handleApprove.bind(this)
  }

  componentWillUnmount() {
    const { setRequestsReceived, safeSetState } = this.props
    safeSetState(() => setRequestsReceived(this.state.initialRequests))
  }

  async handleInfiniteLoad() {
    if (!this.state.hasMore) return

    const {
      user, setRequestsReceived, safePromise, safeSetState,
    } = this.props
    const res = safePromise(await queryRequestsReceived(user._id, this.state.skipQuery))

    safeSetState(() => this.setState(prevState => ({
      skipQuery: prevState.skipQuery + 6,
    })))

    if (res) {
      if (res.data.length === 0) {
        safeSetState(() => this.setState({ hasMore: false }))
      } else {
        safeSetState(() => setRequestsReceived([...this.props.requests, ...res.data]))
      }
    }
  }

  async handleApprove(request) {
    try {
      const { handleApprove, endorseSkill, endorseExperience } = this.props
      const req = JSON.parse(request)
      if (req.type === 'ATTEST_SKILL') {
        endorseSkill(req.endorseeEthAddress, req.data.name, req._id)
      } else if (req.type === 'CONNECT_USER') {
        handleApprove(req._id)
      } else if (req.type === 'ATTEST_EXPERIENCE') {
        console.log(req)
        endorseExperience(req.endorseeEthAddress, req.data.title, req.data.company, req.data.dateFrom, req.data.dateTo, req._id)
      }
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const { requests, handleReject } = this.props

    return (
      <div style={{ overflow: 'auto' }}>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.handleInfiniteLoad}
          hasMore={this.state.hasMore}
          useWindow={false}
          threshold={100}
          loader={
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '70px',
              }}
              key={0}
            >
              <Spin size="large" />
            </div>
          }
        >
          <List
            style={{ overflow: 'auto', padding: '0px 18px' }}
            itemLayout="horizontal"
            dataSource={requests}
            renderItem={request => (
              <RequestItem
                request={request}
                onReject={handleReject}
                onApprove={this.handleApprove}
              />
            )}
          />
        </InfiniteScroll>
      </div>
    )
  }
}

export default NotificationTab
