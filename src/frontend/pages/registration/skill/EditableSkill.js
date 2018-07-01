import React, { Component } from 'react'
import { Icon, Modal } from 'antd'
import SkillForm from './SkillForm'

const styles = {
  icon: {
    cursor: 'pointer',
    margin: '2px',
  },
}

const { confirm } = Modal

class EditableSkill extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.edit = this.edit.bind(this)
    this.showDeleteConfirm = this.showDeleteConfirm.bind(this)
    this.saveRef = this.saveRef.bind(this)
    this.update = this.update.bind(this)
  }

  edit() {
    this.setState(prev => ({ edit: !prev.edit }))
  }

  update() {
    const { form } = this.formRef.props
    const { updateSkill, index } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        updateSkill(index, values)
        this.edit()
      }
    })
  }

  saveRef(ref) {
    this.formRef = ref
  }

  showDeleteConfirm() {
    const { removeSkill, index } = this.props
    confirm({
      title: 'Are you sure to delete skill?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        removeSkill(index)
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  render() {
    const { edit } = this.state
    const { skill: { name, value } } = this.props
    return (
      <div className="holder skill-card">
        {edit ? (
          <div className="wide">
            <SkillForm name={name} value={value} wrappedComponentRef={this.saveRef} />
          </div>
        ) : (
          <div className="wide">
            <span> {name} </span>
          </div>
        )}
        {edit ? (
          <div className="center">
            <Icon onClick={this.edit} type="close-circle-o" className="menu-icon" style={styles.icon} />
            <Icon onClick={this.update} type="check-circle-o" className="menu-icon" style={styles.icon} />
          </div>) :
          <div className="center">
            <Icon type="delete" style={styles.icon} onClick={this.showDeleteConfirm} />
          </div>
        }
      </div>
    )
  }
}

export default EditableSkill
