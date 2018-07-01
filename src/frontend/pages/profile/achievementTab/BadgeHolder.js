import React from 'react'
import { Icon, Row, Col } from 'antd'
import MenuItem from './MenuItem'

const holder = () => (
  <Row className="holder">
    <Row className="line">
      <Col className="center badge-padding">
        <Icon type="trophy" className="badge" />
      </Col>
      <Col className="badge-description">
        <div className="badge-title">Green Horn</div>
        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at nulla eu ipsum consequat tempor. Ut erat mi, egestas eget mi vel, varius viverra erat. Curabitur a turpis velit.</div>
      </Col>
    </Row>
    <Row>
      <Col className="badge-menu">
        <MenuItem />
      </Col>
    </Row>
  </Row>
)

export default holder
