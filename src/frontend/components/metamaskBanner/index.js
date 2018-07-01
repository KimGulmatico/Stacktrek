import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'antd'

class Banner extends React.Component {
  render() {
    const { hasMetamask, web3, ethAddress } = this.props
    function renderComp() {
      if (!hasMetamask) {
        return (<Alert
          description="No metamask detected. Install metamask to use blockchain functionalities of this website"
          type="warning"
          showIcon
          banner
          closable
          style={{ width: '100%' }}
        />)
      } else if (ethAddress !== web3.eth.coinbase) {
        return (<Alert
          description="Active account in metamask is not verified. Please use verified account"
          type="error"
          showIcon
          banner
          closable
          style={{ width: '100%' }}
        />)
      } else if (web3.version.network !== 1) {
        return (<Alert
          description="Metamask not connected to the mainnet."
          type="warning"
          showIcon
          banner
          closable
          style={{ width: '100%' }}
        />)
      }
      return null
    }

    return (
      renderComp()
    )
  }
}

const mapStateToProps = state => ({
  ethAddress: state.user.user && state.user.user.ethAddress,
  hasMetamask: state.web3.hasMetamask,
  web3: state.web3.web3,
})

export default connect(mapStateToProps)(Banner)
