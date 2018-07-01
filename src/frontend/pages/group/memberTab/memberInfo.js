import React from 'react'
import { Button, Icon } from 'antd'
import human from '../../../../../public/img/default-human.svg'

const profile = ({member}) => (
  <div className="holder profile-card">
    <div className="col-sm-4">
    {console.log(member)}
      <img src={human} alt="human" className="person-image" />
    </div>
    <div className="col-sm-14 pad-2">
      <div>{`${member.firstname} ${member.lastname}`}</div>
    </div>
    <div className="col-sm-6">
      {/* <Button type="primary" size="small" className="button"><Icon type="plus" /><span className="button-text">Make Admin</span></Button> */}
      <Button type="danger" size="small" className="button"><Icon type="minus" /><span className="button-text">Remove from Group</span></Button>
    </div>
  </div>
)

export default profile
