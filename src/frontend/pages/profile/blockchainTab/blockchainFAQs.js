import React from 'react'
import { Card, Collapse } from 'antd'

const { Panel } = Collapse

const why = `
  Blockchain is described as a digital ledger in which transactions made in bitcoin 
  or another cryptocurrency are recorded chronologically and publicly. Stacktrek uses blockchain technology
  in order to store your CV or resume in the blockchain. This makes the data from your personalized CV safe and immutable.
  `
const required = `
  We do not require you to have an Ethereum account and write your CV data on the blockchain. We store your personal data on our database.
  Writing data to the blockchain is entirely optional and is up to the user. 
`

const connect = `
  In order for us to associate your account to a specific ethereum address, we need you to verify which account you want to 
  connect your Stacktrek account with. The ethereum address you are connected with allows us fetch your data from the blockchain. 
`
const change = `
  You can change your connected ethereum account, but that would also mean that the data you saved on the blockchain - if there is any - 
  will no longer be associated with your Stacktrek account.
`

const BlockchainFAQs = () => (
  <Card style={{ marginBottom: '1%' }}>
    <div style={{ fontSize: '22px', marginBottom: '1.5%', borderBottom: '1px solid #c4c4c4' }}>
      FAQs
    </div>
    <Collapse>
      <Panel header="What is blockchain and why use it?" key="1">
        <p>{why}</p>
      </Panel>
      <Panel header="Am I required to have an ethereum account and use blockchain?" key="2">
        <p>{required}</p>
      </Panel>
      <Panel header="Why do I need to connect my account to an ethereum address?" key="3">
        <p>{connect}</p>
      </Panel>
      <Panel header="Can I change my connected ethereum account?" key="4">
        <p>{change}</p>
      </Panel>
    </Collapse>
  </Card>
)

export default BlockchainFAQs
