import React from 'react'
import human from '../../../../public/img/default-human.svg'

const UserPicture = ({
  facebookId, width, height, style,
}) => {
  let url = null

  if (facebookId) {
    url = `//graph.facebook.com/${facebookId}/picture?type=large`
  }

  if (!width) width = '75px'
  if (!height) height = '75px'

  return (
    <span>
      <img
        src={url || human}
        className="banner-image center"
        alt="human"
        style={{ width, height, ...style }}
      />
    </span>
  )
}

export default UserPicture
