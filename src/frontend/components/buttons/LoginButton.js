import React from 'react'
import { Button } from 'antd'

const LoginButton = props => (
  <a href="/auth/facebook">
    <Button onClick={() => { }} {...props}>Login with FB</Button>
  </a>
)

export default LoginButton
