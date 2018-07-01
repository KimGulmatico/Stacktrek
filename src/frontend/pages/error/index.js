import React from 'react'
import { Row, Col } from 'antd'

const ErrorPage = () => (
  <div>
    <Row style={{ marginTop: '2%', width: '100%' }}>
      <Col lg={1} />
      <Col lg={22} style={{ textAlign: 'center' }}>
        <Row><Col><span style={{ fontSize: '32px' }}>ERROR 404</span></Col></Row>
        <Row><Col><span style={{ fontSize: '32px' }}>It seems you are lost</span></Col></Row>
        <Row>
          <Col>
            <span style={{ fontSize: '20px' }}>
              Click
              <a href="/"> HERE</a> to return
            </span>
          </Col>
        </Row>
      </Col>
      <Col lg={1} />
    </Row>
  </div>
)

export default ErrorPage
