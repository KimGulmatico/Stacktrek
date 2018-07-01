import React from 'react'
import { Form, Select } from 'antd'
import FormItem from '../FormItem'

const { Option } = Select

class SkillForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      skillList: [],
    }
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch(value) {
    const { skillList } = this.state
    const skills = skillList.filter(skill => skill.toLowerCase().includes(value.toLowerCase()))
    if (skills.length !== 0) {
      this.setState({ skills })
    }
  }

  render() {
    const { name, form: { getFieldDecorator }, skillList } = this.props
    return (
      <Form>
        <FormItem label="Name">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your skill!' }],
            initialValue: name,
          })(<Select showSearch placeholder="Select a skill">
            {skillList.map(skill => (<Option value={skill}>{skill}</Option>))}
          </Select>)}
        </FormItem>
      </Form>
    )
  }
}

const WrappedForm = Form.create()(SkillForm)

export default WrappedForm
