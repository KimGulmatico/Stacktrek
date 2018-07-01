import React from 'react'
import { Tabs, Icon } from 'antd'
import ProfileTab from './profileTab'
import BlockchainTab from './blockchainTab'

const { TabPane } = Tabs

function handleUrlProps(tab) {
  switch (tab) {
  case 'blockchain':
    return '2'
  case 'network':
    return '4'
  case 'edit':
    return '3'
  default:
    return '1'
  }
}

function onChange(activeKey, history) {
  switch (activeKey) {
  case '2':
    return history.push('/profile/blockchain')
  default:
    return history.push('/profile')
  }
}

const Navigation = ({ tab, history }) => (
  <Tabs
    tabBarGutter={8}
    defaultActiveKey={handleUrlProps(tab)}
    onChange={active => onChange(active, history)}
  >
    <TabPane
      tab={
        <span>
          <Icon type="profile" className="account-icon" />
          <span className="hide-on-mobile"> Profile </span>
        </span>
      }
      key="1"
    >
      <ProfileTab />
    </TabPane>
    <TabPane
      tab={
        <span>
          <Icon type="api" className="account-icon" />
          <span className="hide-on-mobile"> Blockchain </span>
        </span>
      }
      key="2"
    > <BlockchainTab />
    </TabPane>
  </Tabs >
)

export default Navigation
