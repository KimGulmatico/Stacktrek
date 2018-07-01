import React, { Component } from 'react'
import { Icon, Button } from 'antd'
import ExperienceForm from './ExperienceForm'

class AddExperience extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
    }

    this.show = this.show.bind(this)
    this.saveFormRef = this.saveFormRef.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  show() {
    this.setState(prev => ({ show: !prev.show }))
  }

  hide() {
    this.setState({ show: false })
  }

  saveFormRef(ref) {
    this.formRef = ref
  }

  handleSubmit() {
    const { form } = this.formRef.props
    form.validateFields((err, values) => {
      if (!err) {
        this.props.addWorkExperience(values)
        this.hide()
      }
    })
  }

  render() {
    const { show } = this.state
    return (
      <div>
        {show ? (
          <div className="holder experience-card col">
            <div className="wide">
              <ExperienceForm wrappedComponentRef={this.saveFormRef} />
            </div>
            <div className="button-container">
              <Button type="danger" className="button" onClick={this.show}>Cancel</Button>
              <Button type="primary" className="button" onClick={this.handleSubmit}>Done</Button>
            </div>
          </div>
        ) : (
          <div className="left pad-6">
            <Icon type="plus" onClick={this.show} className="menu-icon encircle add" />
          </div>
        )
        }
      </div>
    )
  }
}

export default AddExperience
