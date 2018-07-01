import React from 'react'
import { Form, Input } from 'antd'
import FormItem from '../FormItem'

const { TextArea } = Input

class AddInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const {
      firstname, lastname, email, bio, contactNumber, school,
    } = this.props

    return (
      <Form>
        <FormItem label="First Name" >
          {getFieldDecorator('firstname', {
            rules: [{ required: true, message: 'First name is required' }],
            initialValue: firstname,
          })(<Input />)
          }
        </FormItem>
        <FormItem label="Last Name" >
          {getFieldDecorator('lastname', {
            rules: [{ required: true, message: 'Last name is required' }],
            initialValue: lastname,
          })(<Input />)}
        </FormItem>
        <FormItem label="Email" >
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Email is required' }],
            initialValue: email,
          })(<Input />)
          }
        </FormItem>
        <FormItem label="School" >
          {getFieldDecorator('school', {
            initialValue: school,
          })(<Input />)
          }
        </FormItem>
        <FormItem label="Contact Number" >
          {getFieldDecorator('contactNumber', {
            rules: [{ required: true, message: 'Contact number is required' }],
            initialValue: contactNumber,
          })(<Input />)
          }
        </FormItem>
        <FormItem label="Bio">
          {getFieldDecorator('bio', {
            initialValue: bio,
          })(<TextArea rows={4} />)}
        </FormItem>
      </Form>
    )
  }
}

const WrappedAddInfo = Form.create({
  onValuesChange: (props, values) => props.onUserValuesChange(values),
})(AddInfo)

export default WrappedAddInfo
