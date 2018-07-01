import React, { Component } from 'react'
import { Card, List, Icon, Button } from 'antd'
import moment from 'moment'
import { connect } from 'react-redux'
import AddExperience from './AddExperience'
import { createExperience, getExperiences } from '../../../actions/experienceActions'
//import { Button } from 'antd/lib/radio';

class Experiences extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      experiences: [],
      tempExperiences: props.experiences.slice(0, 8),
    }
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.addWorkExperience = this.addWorkExperience.bind(this)
    this.showMore = this.showMore.bind(this)
    this.endorseExp = this.endorseExp.bind(this)
  }

  componentDidMount() {
    this.fetchExperiences()
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.experiences) !== JSON.stringify(this.props.experiences)) {
      this.fetchExperiences()
      this.setState({ tempExperiences: this.props.experiences.slice(0, 8) })
    }
  }

  showModal() {
    this.setState({ visible: true })
  }

  hideModal() {
    this.setState({ visible: false })
  }

  addWorkExperience(experience) {
    this.props.createExperience(experience)
  }

  handleSubmit() {
    this.hideModal()
  }

  async fetchExperiences() {
    await this.props.getExperiences(this.props.user._id)
    const { experiences } = this.props
    this.setState({ experiences })
  }

  showMore() {
    const { experiences } = this.props
    const buffer = 8
    const size = this.state.tempExperiences.length + buffer
    const tempExperiences = experiences.slice(0, size)
    if (this.state.tempExperiences.length < experiences.length) {
      console.log('showing more...')
      this.setState({ tempExperiences })
    } else {
      console.log('showing less...')
      this.setState({ tempExperiences: experiences.slice(0, 8) })
    }
  }
  
  endorseExp() {
    app.service('api/requests').create({ type: 'ATTEST_EXPERIENCE', status: 'PENDING', recipient: '5b1e1f4b838286193fd847dc', recipientFBID: '633458773711847',  data: { title: 'Software Developer', company: 'Stacktrek', dateFrom: 1530250601502, dateTo: 1530250601502, }, senderName: 'Addy Palma', senderFBID: '633458773711847', endorseeEthAddress: '0x61f951702E973Ffc472Fd7E2ef2b550c6804e0eb'  }).then(res => console.log(res))
  }

  render() {
    const { loading } = this.props
    const { tempExperiences, experiences } = this.state
    return (
      <Card style={{ marginBottom: '1%' }} loading={loading}>
        <div style={{ fontSize: '22px', marginBottom: '1%', borderBottom: '1px solid #c4c4c4' }}>Experiences<Icon type="edit" onClick={this.showModal} /></div>
        <AddExperience
          addWorkExperience={this.addWorkExperience}
          onCancel={this.hideModal}
          onOk={this.hideModal}
          visible={this.state.visible}
        />
        <List
          dataSource={tempExperiences}
          renderItem={item => (
            <div className="holder experience-card">
              <div>
                <div className="title">{item.title}</div>
                <div>{item.company}</div>
                <div>{moment(new Date(item.start)).format('MMM YYYY')} - {item.present ? 'present' : moment(new Date(item.end)).format('MMM YYYY')}</div>
                <div>
                  <select onChange={this.handleChange}>
                   <option> Addy </option>)}
                  </select>
                  <Button onClick={this.endorseExp} style={{ margin: '0px 5px' }}>
                    Endorse
                  </Button>
                </div>
              </div>
            </div>
          )}
        />
        <div className="text-center">
          {experiences.length > 8 ? (<Icon
            type={tempExperiences.length < experiences.length ? 'down-circle-o' : 'up-circle-o'}
            onClick={this.showMore}
            className="view-button"
          />) : ''}
        </div>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  experiences: state.experiences.experiences,
})

const mapDispatchToProps = dispatch => ({
  createExperience: experience => dispatch(createExperience(experience)),
  getExperiences: id => dispatch(getExperiences(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Experiences)
