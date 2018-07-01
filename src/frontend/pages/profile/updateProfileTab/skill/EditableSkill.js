import React, { Component } from 'react'
import { Icon, Modal } from 'antd'
import ProfilePicture from '../../../../components/profilePicture'
import CountCircle from '../../../../components/countCircle'

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
    this.showDeleteConfirm = this.showDeleteConfirm.bind(this)
    this.saveRef = this.saveRef.bind(this)
    this.update = this.update.bind(this)
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
    const { skill, backupSkills } = this.props
    const profilePictureStyle = {
      marginLeft: '-8px',
      border: '1px solid white',
    }
    return (
      <div className="holder skill-card">
        <div className="wide">
          <div>Name: {skill.name}</div>
          <div>
            Endorsements:
            <span style={{ display: 'inline-flex', marginLeft: '8px' }}>
              {skill.endorsers && skill.endorsers.length !== 0 ? skill.endorsers.slice(0, 3).map(endorsers => (
                <ProfilePicture
                  facebookId={endorsers.recipientFBID}
                  width={30}
                  height={30}
                  style={profilePictureStyle}
                  key={endorsers._id}
                />
              )) : 'none'}
              {skill.endorsers && skill.endorsers.length >= 4 ? (
                <CountCircle
                  count={skill.endorsers.length - 3}
                  diameter={30}
                  style={profilePictureStyle}
                />) : ''}
            </span>
          </div>
        </div>
        {
          !backupSkills.includes(skill) &&
          <div className="center">
            <Icon type="delete" style={styles.icon} onClick={this.showDeleteConfirm} />
          </div>
        }

      </div>
    )
  }
}

export default EditableSkill
