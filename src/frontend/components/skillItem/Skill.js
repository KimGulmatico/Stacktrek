import React, { Fragment } from 'react'
import uuidv4 from 'uuid/v4'
import ProfilePicture from '../profilePicture'
import CountCircle from '../countCircle'

const profilePictureStyle = {
  marginLeft: '-8px',
  border: '1px solid white',
}

const Skill = ({ skill, attestors }) => (
  <Fragment>
    <div>Name: {skill.name} </div>
    <div>Endorsements:
      <span style={{ display: 'inline-flex' }}>
        <span style={{ display: 'inline-flex', marginLeft: '8px' }}>
          {attestors && attestors.length ?
            (attestors.slice(0, 3).map(() =>
              (<ProfilePicture
                width={30}
                height={30}
                style={profilePictureStyle}
                key={uuidv4()}
              />))) : 'None'} <br />
        </span>
        {attestors && attestors.length >= 4 ?
          <CountCircle
            count={attestors.length - 3}
            diameter={30}
            style={profilePictureStyle}
          /> : ''}
      </span>
    </div>
  </Fragment>
)

export default Skill
