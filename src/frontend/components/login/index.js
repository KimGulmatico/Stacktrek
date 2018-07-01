import React from 'react'
import { Card, Icon } from 'antd'
import LoginButton from '../buttons/LoginButton'

const Login = () => (
  <div style={{ height: '100vh', display: 'flex' }}>
    <Card style={{
      display: 'inline-block',
      height: '200px',
      padding: '30px',
      margin: 'auto',
      position: 'relative',
      top: '-125px',
    }}
    >
      <p style={{ fontSize: '1.3em' }}> You need to login to view this page <Icon type="exclamation-circle-o" /></p>
      <LoginButton type="primary" />
    </Card>
  </div>
)

export default Login
