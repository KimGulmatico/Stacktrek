import React from 'react'
import { Button, Icon } from 'antd'
import human from '../../../../../public/img/default-human.svg'

const Profile = ({
  name, title, image, onConnect,
}) => (
  <div className="holder profile-card">
    <div className="col-sm-4">
      <img src={image || human} alt="human" className="person-image" />
    </div>
    <div className="col-sm-14 pad-2">
      <div className="profile-name">{name}</div>
      <div>{title}</div>
    </div>
    <div className={onConnect ? 'col-sm-6' : 'hide'}>
      <Button type="primary" size="small" className="wide" onClick={onConnect}><Icon type="plus" /><span className="button-text">Connect</span></Button>
    </div>
  </div>
)

export default Profile
