import React from 'react'
import { Row, Col } from 'antd'

const badgeCounter = () => (
  <Row
    type="flex"
    align="middle"
    justify="center"
    className="achievement-counter"
  >
    <Col>
      <div className="text">You have</div>
      <div className="count">0</div>
      <div className="text">badges</div>
    </Col>
  </Row>
)

export default badgeCounter
