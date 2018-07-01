import React from 'react'

const circleStyle = {
  backgroundColor: '#F0F0F0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const Circle = ({ count, diameter = 30, style = {} }) => (
  <div style={{
    ...circleStyle, ...style, height: diameter, width: diameter, borderRadius: diameter / 2,
  }}
  >
    <span>+{count}</span>
  </div>
)

export default Circle
