import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Modal, Row } from 'antd'
import { insertUser } from '../../../actions/contractActions'
import ConnectedAccount from './connectedAccount'
import BlockchainFAQs from './blockchainFAQs'
import ActiveAccount from './activeAccount'

class BlockchainTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      metamaskEthAdress: null,
      visible: false,
    }
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.confirm = this.confirm.bind(this)
  }

  async componentDidMount() {
    const { web3, contract, user } = this.props
    this.setState({ metamaskEthAdress: web3.eth.coinbase })
    if (user.ethAddress) {
      try {
        const res = await contract.getUserInfo(user.ethAddress)
        this.setState({ isUserInBlockchain: web3.toUtf8(res[0]).length > 0 })
      } catch (e) {
        this.setState({ isUserInBlockchain: false })
      }
    }
  }

  async confirm() {
    const { insertUserToBlockchain, user: { firstname, lastname } } = this.props
    const { metamaskEthAdress } = this.state
    try {
      await insertUserToBlockchain(firstname, lastname, metamaskEthAdress)
      this.setState({ isUserInBlockchain: true })
    } catch (e) {
      console.log(e)
    }
    this.hideModal()
  }

  showModal() {
    this.setState({ visible: true })
  }

  hideModal() {
    this.setState({ visible: false })
  }

  render() {
    const { user, hasMetamask } = this.props
    const { metamaskEthAdress, isUserInBlockchain } = this.state
    return (
      <Layout
        className="container"
      >
        <Modal
          title="Connect ethereum address?"
          visible={this.state.visible}
          onOk={this.confirm}
          onCancel={this.hideModal}
          okText="Yes"
          cancelText="No"
        >
          Doing so would connect this ethereum address to your account.
        </Modal>
        <Row>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <ConnectedAccount
              user={user}
              metamaskEthAdress={metamaskEthAdress}
              isUserInBlockchain={isUserInBlockchain}
              hasMetamask={hasMetamask}
              showModal={this.showModal}
            />
            <ActiveAccount
              hasMetamask={hasMetamask}
              isUserInBlockchain={isUserInBlockchain}
              metamaskEthAdress={metamaskEthAdress}
              userEthAddress={user && user.ethAddress}
            />
          </div>
          <BlockchainFAQs />
        </Row>
      </Layout >
    )
  }
}

const mapStateToProps = state => ({
  contract: state.web3.contract,
  web3: state.web3.web3,
  user: state.user.user,
  hasMetamask: state.web3.hasMetamask,
})

const mapDispatchToProps = dispatch => ({
  insertUserToBlockchain: (firstname, lastname, address) => dispatch(insertUser(firstname, lastname, address)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BlockchainTab)
