import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Divider, List, Modal, Button, Icon, Card } from 'antd'
import ProfilePicture from '../../../components/profilePicture'
import { getUserConnections, removeConnection } from '../../../actions/userActions'

const { confirm } = Modal

class ConnectionTab extends Component {
  constructor(props) {
    super(props)
    this.showDeleteConfirm = this.showDeleteConfirm.bind(this)
  }

  componentDidMount() {
    const { getConnections, user, safePromise } = this.props
    safePromise(getConnections(user._id))
  }

  showDeleteConfirm(userId, friendId, connection) {
    const { removeConn } = this.props
    confirm({
      title: `Do you want to delete ${connection.firstname}?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        removeConn(userId, friendId)
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  render() {
    const { networkConnections, userId, isFetching } = this.props
    return (
      <div className="container padded-holder">
        <Divider>Connections</Divider>
        <div style={{ padding: '0px 12px' }}>
          {
            isFetching ? <Card loading={isFetching} /> : <List
              dataSource={networkConnections}
              renderItem={item => (
                <List.Item key={item._id}>
                  <List.Item.Meta
                    avatar={<a href={`/#/user/${item.facebookId}`}><ProfilePicture facebookId={item.facebookId} width="64px" height="64px" /></a>}
                    title={<a href={`/#/user/${item.facebookId}`}>{item.firstname} {' '} {item.lastname}</a>}
                    description={<a href={`/#/user/${item.facebookId}`} style={{ color: 'inherit' }}>{item.company ? item.company : (item.school && item.school)}</a>}
                  />
                  <Button
                    type="dashed"
                    size="small"
                    style={{ background: 'none' }}
                    onClick={() => this.showDeleteConfirm(userId, item._id, item)}
                  >
                    Remove <Icon type="delete" />
                  </Button>
                </List.Item>
              )}
            />
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  userId: state.user.user._id,
  networkConnections: state.user.networkConnections,
})

const mapDispatchToProps = dispatch => ({
  getConnections: id => dispatch(getUserConnections(id)),
  removeConn: (userId, friendId) => dispatch(removeConnection(userId, friendId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionTab)
