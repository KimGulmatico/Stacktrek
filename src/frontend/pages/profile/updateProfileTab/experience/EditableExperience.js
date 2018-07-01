import React, { Component } from 'react'
import moment from 'moment'
import { Icon, Modal } from 'antd'
import ExperienceForm from './ExperienceForm'

const styles = {
  icon: {
    cursor: 'pointer',
    margin: '2px',
  },
}

const { confirm } = Modal

class EditableExperience extends Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
    }

    this.update = this.update.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.showDeleteConfirm = this.showDeleteConfirm.bind(this)
    this.saveRef = this.saveRef.bind(this)
  }

  update() {
    const { form } = this.formRef.props
    form.validateFields((err, values) => {
      if (!err) {
        const { updatedWorkExperience, index } = this.props
        updatedWorkExperience(index, values)
        this.toggleEdit()
      }
    })
  }

  toggleEdit() {
    this.setState(prev => ({ edit: !prev.edit }))
  }

  showDeleteConfirm() {
    const { removeWorkExperience, index } = this.props
    confirm({
      title: 'Are you sure to delete work experience?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        removeWorkExperience(index)
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  formatDate(date) {
    const options = {
      year: 'numeric', month: 'long',
    }
    return moment(new Date(date)).format('MMM YYYY')
  }

  saveRef(ref) {
    this.formRef = ref
  }

  render() {
    const { edit } = this.state
    const { item } = this.props
    return (
      <div className="holder experience-card">
        {edit ? (
          <div className="wide">
            <ExperienceForm
              wrappedComponentRef={this.saveRef}
              title={item.title}
              company={item.company}
              start={item.start}
              end={item.end}
            />
          </div>
        ) : (
          <div>
            <div className="title">{item.title}</div>
            <div>{item.company}</div>
            <div>{this.formatDate(item.start)} - {this.formatDate(item.end)}</div>
          </div>
        )}
        {edit ? (
          <div className="center">
            <Icon onClick={this.toggleEdit} type="close-circle-o" className="menu-icon" style={styles.icon} />
            <Icon onClick={this.update} type="check-circle-o" className="menu-icon" style={styles.icon} />
          </div>) :
          <div className="center">
            <Icon type="edit" onClick={this.toggleEdit} style={styles.icon} />
            <Icon type="delete" onClick={this.showDeleteConfirm} style={styles.icon} />
          </div>
        }
      </div>
    )
  }
}

export default EditableExperience
