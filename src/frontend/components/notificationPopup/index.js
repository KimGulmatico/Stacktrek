import React from 'react'
import { notification, Icon } from 'antd'
import { connect } from 'react-redux'
import client from '../../client'
import { addNewRequestReceived } from '../../actions/userActions'

class NotificationPopup extends React.Component {
  constructor(props) {
    super(props)
    this.openNotification = this.openNotification.bind(this)
  }

  componentDidMount() {
    const { user, addRequest } = this.props

    client.service('api/requests').on('created', (res) => {
      const request = {
        _id: res._id,
        senderName: res.senderName,
        type: res.type,
        data: res.data,
        senderFBID: res.senderFBID,
      }

      if (res.recipient === user._id && res.type === 'CONNECT_USER') {
        addRequest(request)
        this.openNotification(res.senderName, res.type)
      } else if (res.recipient === user._id && res.type === 'ATTEST_SKILL') {
        addRequest(request)
        this.openNotification(res.senderName, res.type)
      }
    })
  }

  componentWillUnmount() {
    client.service('api/requests').removeListener('created')
  }

  openNotification(name, type) {
    let message
    let description
    let icon

    if (type === 'CONNECT_USER') {
      description = 'Connect user'
      message = `${name} wants to connect with you`
      icon = <Icon type="smile-circle" style={{ color: '#108ee9' }} />
    } else if (type === 'ATTEST_SKILL') {
      description = 'Attest skill'
      message = `${name} sent a skill attestation request`
      icon = <Icon type="plus-circle-o" />
    }

    notification.open({
      message,
      description,
      icon,
    })
  }

  render() {
    return (
      <div />
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
})

const mapDispatchToProps = dispatch => ({
  addRequest: request => dispatch(addNewRequestReceived(request)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPopup)
