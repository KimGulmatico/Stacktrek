import React, { Component } from 'react'
import { Modal, message, Form, DatePicker, Input, Checkbox } from 'antd'
import moment from 'moment'

const { MonthPicker } = DatePicker
const FormItem = Form.Item
class AddExperience extends Component {
  constructor(props) {
    super(props)
    this.state = {
      present: false,
      experience: { start: new Date(), end: new Date() },
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
    this.handleStart = this.handleStart.bind(this)
    this.handleEnd = this.handleEnd.bind(this)
  }

  handleSubmit() {
    const { title, start, end } = this.state.experience
    if (start < end) {
      if (title) {
        this.props.addWorkExperience(this.state.experience)
        this.props.onOk()
        this.setState({ experience: { start: new Date(), end: new Date() } })
      } else {
        message.error('No title')
      }
    } else {
      message.error('You cannot end before starting')
    }
  }

  handleChange(e) {
    const { experience } = this.state
    experience[e.target.name] = e.target.value
  }

  handleCheck() {
    this.setState(prevState => ({
      present: !prevState.present,
      experience: { ...prevState.experience, present: !prevState.present },
    }))
  }

  handleStart(date) {
    this.setState(prevState => ({ experience: { ...prevState.experience, start: date } }))
  }

  handleEnd(date) {
    if (this.state.start > date) {
      message.error('You can\'t resign before you start working.')
    } else {
      this.setState(prevState => ({ experience: { ...prevState.experience, end: date } }))
    }
  }

  render() {
    const { form: { getFieldDecorator } } = this.props
    return (
      <Modal
        visible={this.props.visible}
        onOk={this.handleSubmit}
        onCancel={this.props.onCancel}
        title="Add an experience"
        destroyOnClose
      >
        <Form>
          <FormItem label="Title">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Please input title!' }],
              initialValue: '',
            })(<Input name="title" onChange={this.handleChange} />)
            }
          </FormItem>
          <FormItem label="Company">
            {getFieldDecorator('company', {
              rules: [{ required: true, message: 'Please input company!' }],
              initialValue: '',
            })(<Input name="company" onChange={this.handleChange} />)
            }
          </FormItem>
          <FormItem label="Start">
            {getFieldDecorator('from', {
              rules: [{ required: true, message: 'Please input start date!' }],
              initialValue: moment(new Date()),
            })(<MonthPicker placeholder="Start" name="start" onChange={this.handleStart} />)
            }
            <br />
          </FormItem>
          <FormItem label="End">
            {getFieldDecorator('to', {
              rules: [{ required: true, message: 'Please input end date!' }],
              initialValue: moment(new Date()),
            })(<div><MonthPicker placeholder="End" disabled={this.state.present} name="end" onChange={this.handleEnd} />{' or '}<Checkbox value="present" onChange={this.handleCheck}>I'm still working here.</Checkbox></div>)
            }
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

const FormWrapper = Form.create()(AddExperience)
export default FormWrapper
