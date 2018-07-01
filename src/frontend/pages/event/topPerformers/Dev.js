import React from 'react'
import { Col } from 'antd'
import ProfilePicture from '../../../components/profilePicture'

const Dev = ({ dev }) => (
  <Col xs={24} md={8} key={dev.name} className="top-performers-thumbnail" style={{ width: '32%' }}>
    <ProfilePicture facebookId={dev.facebookId} width="12vw" height="12vw" />
    <div style={{ padding: '16px' }}>
      <span className="top-dev-name">{`${dev.firstName.toUpperCase()} ${dev.lastName.toUpperCase()}`}</span>
      <p className="top-dev-school">{`${dev.school.toUpperCase()}`}</p>
      <span className="top-dev-rating">
        {`Proxor Rating: ${dev.proxorRating}`}
      </span>
    </div>
  </Col>
)

export default Dev
