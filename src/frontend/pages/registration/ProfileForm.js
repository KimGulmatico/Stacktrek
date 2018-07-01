import React from 'react'
import { Input, Form } from 'antd'

const FormItem = Form.Item

const styles = {
  input: {
    width: '100%',
    margin: '0px',
  },
}

class ProfileForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { user } = this.props
    return (
      <Form>
        <FormItem>
          {getFieldDecorator('firstname', {
            initialValue: user.firstname,
            rules: [{
              required: true, message: 'Please input your first name',
            }],
          })(<Input style={styles.input} placeholder="First Name" onChange={this.handleChange} />)
          }
        </FormItem>
        <FormItem>
          {getFieldDecorator('middlename', {
            rules: [{
              required: true, message: 'Please input your middle name',
            }],
          })(<Input style={styles.input} placeholder="Middle Name" onChange={this.handleChange} />)
          }
        </FormItem>
        <FormItem>
          {getFieldDecorator('lastname', {
            initialValue: user.lastname,
            rules: [{
              required: true, message: 'Please input your first name',
            }],
          })(<Input style={styles.input} placeholder="Last Name" onChange={this.handleChange} />)
          }
        </FormItem>
        <FormItem>
          {getFieldDecorator('email', {
            initialValue: user.email,
            rules: [{
              type: 'email', message: 'The input is not a valid email',
            },
            {
              required: true, message: 'Please input your email',
            }],
          })(<Input style={styles.input} placeholder="Email" onChange={this.handleChange} />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('school', {
            initialValue: user.school,
            rules: [{
              required: true, message: 'Please input your school',
            }],
          })(<Input style={styles.input} placeholder="School" onChange={this.handleChange} />)
          }
        </FormItem>
        <FormItem>
          {
            getFieldDecorator('company', {
              initialValue: user.company,
            })(<Input style={styles.input} placeholder="Company(Optional)" onChange={this.handleChange} />)
          }
        </FormItem>
        <FormItem>
          {getFieldDecorator('contactNumber', {
            initialValue: user.contactNumber,
            rules: [{
              required: true, message: 'Please input your phone number',
            }],
          })(<Input style={styles.input} placeholder="Contact Number" onChange={this.handleChange} />)}
        </FormItem>
      </Form >
    )
  }
}

const WrappedProfileForm = Form.create()(ProfileForm)

export default WrappedProfileForm
