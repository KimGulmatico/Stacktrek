import React, { Component, Fragment } from 'react'
import { Button, Icon } from 'antd'
import SkillForm from './SkillForm'

class AddSkill extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
    }

    this.show = this.show.bind(this)
    this.done = this.done.bind(this)
    this.saveRef = this.saveRef.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  show() {
    this.setState(prev => ({ show: !prev.show }))
  }

  done() {
    this.setState({ show: false })
  }

  saveRef(ref) {
    this.formRef = ref
  }

  handleSubmit() {
    const { form } = this.formRef.props
    form.validateFields((err, values) => {
      if (!err) {
        this.done()
        this.props.addSkill(values)
      }
    })
  }

  render() {
    const { show } = this.state
    return (
      <Fragment>
        {show ? (
          <div className="holder skill-card col">
            <div className="wide">
              <SkillForm wrappedComponentRef={this.saveRef} skillList={this.props.skillList} />
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
          )}
      </Fragment>
    )
  }
}

export default AddSkill
