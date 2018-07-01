import React from 'react'
import Loadable from 'react-loadable'

import { Spin, Icon } from 'antd'

const Loading = (props) => {
  const loadingIcon = <Icon type="hourglass" style={{ fontSize: 24 }} spin />
  const errorIcon = <Icon type="frown" />
  const delayIcon = <Icon type="sync" />
  if (props.error) {
    return <div>{errorIcon}</div>
  } else if (props.timedOut) {
    return <div>{delayIcon}</div>
  } else if (props.pastDelay) {
    return <Spin indicator={loadingIcon} />
  }
  return null
}
const LoadableComp = func => Loadable({
  loading: Loading,
  loader: func,
})

export default LoadableComp
