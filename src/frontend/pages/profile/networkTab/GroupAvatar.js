import React from 'react'
import { Icon } from 'antd'
import human from '../../../../../public/img/default-human.svg'

const GroupAvatar = ({ type, image }) => (
  <div className="avatar-container">
    {type === 'icon' ? <Icon type="plus" className="plus-icon" /> : <img src={image || human} className="group-image" alt="human" />}
  </div>
)

export default GroupAvatar
