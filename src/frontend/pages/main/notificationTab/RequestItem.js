import React from 'react'
import { List, Button, Icon, Card } from 'antd'
import PropTypes from 'prop-types'
import ProfilePicture from '../../../components/profilePicture'

class Request extends React.Component {
  constructor(props) {
    super(props)
    this.renderRequestType = this.renderRequestType.bind(this)
    this.renderDescription = this.renderDescription.bind(this)
  }

  renderRequestType() {
    const { request } = this.props
    switch (request.type) {
    case 'ATTEST_SKILL':
      return 'ATTEST'
    case 'CONNECT_USER':
      return 'CONNECT'
    default:
      return null
    }
  }

  renderDescription() {
    const { request } = this.props
    switch (request.type) {
    case 'ATTEST_SKILL':
      return `Sent an attestation request on ${request.data.name}`
    case 'ATTEST_EXPERIENCE':
      return `Sent an attestation request as a ${request.data.title} on ${request.data.company} 
              from ${new Date(request.data.dateFrom).getFullYear()} to ${new Date(request.data.dateTo).getFullYear()}` 
    case 'CONNECT_USER':
      return 'Wants to connect with you'
    default:
      return null
    }
  }

  render() {
    const { request, onApprove, onReject } = this.props
    return (
      <Card>
        <List.Item
          style={{ padding: '0px', margin: '0px' }}
          actions={[
            <Button type="primary" ghost onClick={() => onApprove(JSON.stringify(request))} ><Icon type="check" />Yes</Button>,
            <Button type="danger" ghost onClick={() => onReject(request._id)}><Icon type="close" />No</Button>,
          ]}
        >
          <List.Item.Meta
            avatar={<ProfilePicture
              facebookId={request.senderFBID}
              width="42px"
              height="42px"
            />}
            title={<a href={`/#/user/${request.senderFBID}`} style={{ color: 'inherit' }}>{request.senderName}</a>}
            description={this.renderDescription()}
          />
          <div>{this.renderRequestType()}</div>
        </List.Item>
      </Card>
    )
  }
}

Request.propType = {
  name: PropTypes.object.isRequired,
  onReject: PropTypes.func.isRequired,
  onApprove: PropTypes.func.isRequired,
}

export default Request

