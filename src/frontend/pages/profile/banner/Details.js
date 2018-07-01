import React from 'react'

const details = ({
  bio, firstname, lastname, company, school,
}) =>
  (
    <div>
      <span className="banner-name">{firstname && firstname} {' '} {lastname && lastname} </span><br />
      <span className="banner-school">{company || school}</span><br />
      <span className="banner-school">{bio}</span>
    </div>
  )

export default details

