import React from 'react'
import { Tooltip, Tag } from 'antd'

const style = {
  circle: {
    display: 'inline-flex',
    fontSize: '30px',
  },
  title: {
    fontSize: '10px',
  },
  level: {
    fontSize: '10px',
  },
}

const Badge = ({ rating, title }) => (
  <span style={style.circle}>
    <Tooltip title={title} placement="bottom">
      <Tag color="geekblue">Proxor Level {rating}</Tag>
    </Tooltip>
  </span>
)

export default Badge
