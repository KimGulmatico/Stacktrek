import React, { Component } from 'react'
import { Modal, Select, message, Form } from 'antd'

const FormItem = Form.Item
const { Option } = Select
class AddSkill extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit() {
    if (this.state.value) {
      const value = { name: this.state.value }
      this.props.addSkill(value)
      this.props.onOk()
      this.setState({ value: undefined })
    } else {
      message.error('Skill has been added')
    }
  }

  handleChange(value) {
    this.setState({ value })
  }

  render() {
    const { form: { getFieldDecorator } } = this.props
    return (
      <Modal
        visible={this.props.visible}
        onOk={this.handleSubmit}
        onCancel={this.props.onCancel}
        title="Add a skill"
      >
        <Form>
          <FormItem>
            {getFieldDecorator('skill', {
              rules: [{ required: true, message: 'Please select a skill.' }],
            })(<Select
              showSearch
              placeholder="Select a skill"
              onChange={this.handleChange}
              style={{ width: '100%' }}
            >
              {this.props.skillList.map(skill => (
                <Option key={skill} value={skill}>{skill}</Option>
              ))}
               </Select>)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

const FormWrapper = Form.create()(AddSkill)
export default FormWrapper
