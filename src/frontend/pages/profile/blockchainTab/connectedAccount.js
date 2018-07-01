import React, { Fragment } from 'react'
import { Card, Button, Icon } from 'antd'

const ConnectedAccount = ({
  user, metamaskEthAdress, isUserInBlockchain, hasMetamask, showModal,
}) =>
  (
    <Card className="blockchain-container">
      <div style={{ fontSize: '22px', marginBottom: '1.5%', borderBottom: '1px solid #c4c4c4' }}>
        Connected Ethereum Account
      </div>
      <Card.Grid className="blockchain-grid-style">
        {
          metamaskEthAdress &&
          <span style={{ margin: '0 8px' }}>
            {metamaskEthAdress}
          </span>
        }
        {(user && user.ethAddress && isUserInBlockchain) ?
          <span> Verified Account {' '}<Icon type="key" /> </span> :
          <Fragment>
            {
              metamaskEthAdress ?
                <Button type="primary" onClick={showModal} disabled={!hasMetamask}>Connect Account</Button>
                :
                <Fragment>
                  <span> No account found </span>
                  <Icon type="warning" />
                </Fragment>
            }
          </Fragment>
        }
      </Card.Grid>
    </Card>
  )

export default ConnectedAccount
