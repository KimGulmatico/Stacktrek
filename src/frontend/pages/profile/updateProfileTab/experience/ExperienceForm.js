import React from 'react'
import { DatePicker, Form, Input } from 'antd'
import moment from 'moment'
import FormItem from '../FormItem'

const { MonthPicker } = DatePicker

class ExperienceForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { form: { getFieldDecorator } } = this.props
    const {
      title, company, start, end,
    } = this.props
    return (
      <Form>
        <FormItem label="Title">
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please input title!' }],
            initialValue: title || '',
          })(<Input />)
          }
        </FormItem>
        <FormItem label="Company">
          {getFieldDecorator('company', {
            rules: [{ required: true, message: 'Please input company!' }],
            initialValue: company || '',
          })(<Input />)
          }
        </FormItem>
        <FormItem label="From">
          {getFieldDecorator('start', {
            rules: [{ required: true, message: 'Please input start date!' }],
            initialValue: moment(start),
          })(<MonthPicker placeholder="Start" />)
          }
          <br />
        </FormItem>
        <FormItem label="End">
          {getFieldDecorator('end', {
            rules: [{ required: true, message: 'Please input end date!' }],
            initialValue: moment(end),
          })(<MonthPicker placeholder="End" />)
          }
        </FormItem>
      </Form>
    )
  }
}

const WrappedForm = Form.create()(ExperienceForm)

export default WrappedForm
