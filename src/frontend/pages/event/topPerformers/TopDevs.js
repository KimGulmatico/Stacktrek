import React from 'react'
import Dev from './Dev'

const TopDevs = (props) => {
  const { devs } = props

  const topDevs = devs.map(dev => (
    <Dev dev={dev} key={dev.objectId} />
  ))

  return (
    <div className="top-performers-container" style={{ backgroundColor: '#c8d0d6' }}>
      <span className="top-performers-header">TOP DEVS</span>
      <p className="top-performers-sub">FROM CONCLUDED TOURNAMENTS</p>
      <div style={{ display: 'flex', flexDirection: 'row', justify: 'space-between' }}>
        {topDevs}
      </div>
    </div>
  )
}

export default TopDevs
