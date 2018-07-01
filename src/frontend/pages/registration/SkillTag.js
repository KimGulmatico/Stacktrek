import React, { Component } from 'react'
import { Tag } from 'antd'

const { CheckableTag } = Tag

export default class SkillTag extends Component {
  constructor() {
    super()
    this.state = {
      checked: true,
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(checked) {
    const { skill, addSkill } = this.props
    if (!checked) {
      this.setState({ checked })
      addSkill(skill)
    }
  }
  render() {
    return (
      <CheckableTag {...this.props} checked={this.state.checked} onChange={this.handleChange} disabled={this.state.checked} />
    )
  }
}
