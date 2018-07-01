import React, { Component } from 'react'
import { Card, Icon, List } from 'antd'
import AddCertificate from './AddCertificate'

class Certificates extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount() {

  }

  showModal() {
    this.setState({ visible: true })
  }

  hideModal() {
    this.setState({ visible: false })
  }

  render() {
    return (
      <Card style={{ marginBottom: '1%' }}>
        <AddCertificate
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.hideModal}
        />
        <div style={{ fontSize: '22px', marginBottom: '1%', borderBottom: '1px solid #c4c4c4' }}>Certificates<Icon type="edit" onClick={this.showModal} /></div>
        {/* <div style={{ width: '100%', margin: '1%' }}> */}
        {/* <List
          dataSource={tempSkills}
          renderItem={skill =>
            (<SkillItem
              skill={skill}
              onEndorse={onEndorse}
              network={network}
              key={skill._id}
            />)
          }
        /> */}
        <div className="text-center">
          {/* {skills.length > 8 ? (<Icon
            type={tempSkills.length < skills.length ? 'down-circle-o' : 'up-circle-o'}
            onClick={this.showMore}
            className="view-button"
          />) : ''} */}
        </div>
      </Card>
    )
  }
}

// const mapDispatchToProps = dispatch => ({
//   createSkill: skill => dispatch(createSkill(skill)),
// })

// export default connect(null, mapDispatchToProps)(Certificates)

export default Certificates

