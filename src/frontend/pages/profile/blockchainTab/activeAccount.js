import React from 'react'
import { Card, Icon, Tooltip } from 'antd'

const ActiveAccount = ({ metamaskEthAdress, userEthAddress, isUserInBlockchain }) => {
  const notEqual = userEthAddress !== metamaskEthAdress

  
   const tooltipText = () => {
    if (notEqual && userEthAddress) {
      return 'Metamask account does not match verified account'
    } else if (!metamaskEthAdress) {
      return 'There is no ethereum account detected'
    } else if (!notEqual) {
      return 'Active ethereum account matches verified account'
    }
    return null
  }

  return (
    <Card className="blockchain-container">
      <div style={{ fontSize: '22px', marginBottom: '1.5%', borderBottom: '1px solid #c4c4c4' }}>
        Active Ethereum Account
      </div>
      <Tooltip placement="bottom" title={tooltipText()}>
        <Card.Grid className="blockchain-grid-style" >
          {
            metamaskEthAdress &&
            <span style={{ margin: '0 8px' }} >
              {metamaskEthAdress}
            </span>
          }
          {((notEqual && userEthAddress) || !metamaskEthAdress) &&
            <span style={{ marginRight: '4px' }}>
              {(notEqual && userEthAddress) ?
                <span style={{ color: '#ffa39e' }}>Not verified <Icon type="warning" /> </span> :
                <span style={{ color: '#ffa39e' }}>No address found  <Icon type="warning" /> </span>
              }
            </span>
          }
          {(!notEqual && isUserInBlockchain) &&
            <span style={{ marginRight: '4px' }}>
              <span style={{ color: '#2f54eb' }}> Verified match <Icon type="check" /> </span>
            </span>
          }
        </Card.Grid>
      </Tooltip>
    </Card>
  )
}

export default ActiveAccount
