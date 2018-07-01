import React, { Component } from 'react'
import { Card, Icon, Modal, Form, List } from 'antd'
import AddInfo from '../updateProfileTab/info/AddInfo'

class Bio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
    this.hideModal = this.hideModal.bind(this)
    this.showModal = this.showModal.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  showModal() {
    this.setState({ visible: true })
  }

  hideModal() {
    this.setState({ visible: false })
  }

  handleSubmit() {
    this.props.onSubmit()
    this.hideModal()
  }

  render() {
    const { loading, bio, user } = this.props
    return (
      <Card style={{ marginBottom: '1%' }} loading={loading}>
        <Modal
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.hideModal}
          width="800px"
        >
          <AddInfo
            wrappedComponentRef={this.props.saveInfoRef}
            firstname={user.firstname}
            lastname={user.lastname}
            email={user.email}
            bio={user.bio}
            school={user.school}
            contactNumber={user.contactNumber}
            onUserValuesChange={this.props.onUserValuesChange}
          />
        </Modal>
        <div style={{ fontSize: '22px', marginBottom: '1.5%', borderBottom: '1px solid #c4c4c4' }}>Bio<Icon type="edit" onClick={this.showModal} /></div>
        {bio && bio.trim() ?
          <div style={{ marginTop: '1%' }}> {bio}</div>
          : <List dataSource={[]} />}
      </Card>
    )
  }
}

const BioFormWrapper = Form.create()(Bio)

export default BioFormWrapper
