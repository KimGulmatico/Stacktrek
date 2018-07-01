import React from 'react'
import { Card, Icon } from 'antd'

const connectedAccount = ({ fblink }) => (
  <Card>
    <div style={{ fontSize: '22px', marginBottom: '1%', borderBottom: '1px solid #c4c4c4' }}>Connected Accounts</div>
    <a href={fblink} target="_blank"><Icon style={{ padding: '10px' }} type="facebook" className="account-icon" /></a>
    <Icon style={{ padding: '10px' }} type="github" className="account-icon" />
    <Icon style={{ padding: '10px' }} type="twitter" className="account-icon" />
    <Icon style={{ padding: '10px' }} type="medium" className="account-icon" />
  </Card>
)

export default connectedAccount
