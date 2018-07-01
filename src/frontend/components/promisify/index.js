import React from 'react'

class Promisify extends React.Component {
  constructor(props) {
    super(props)
    this.safePromise = this.safePromise.bind(this)
    this.safeSetState = this.safeSetState.bind(this)
  }

  componentDidMount() {
    this._mounted = true
  }

  componentWillUnmount() {
    this._mounted = false
  }

  safePromise(promise) {
    if (this._mounted) {
      return promise
    }
    return null
  }

  safeSetState(setState) {
    if (this._mounted) {
      setState()
    }
  }


  render() {
    return this.props.children({
      safePromise: this.safePromise,
      safeSetState: this.safeSetState,
    })
  }
}

export default function promisify(WrappedComponent) {
  return props =>
    (
      <Promisify>
        {
          promisifyProps =>
            <WrappedComponent {...{ ...promisifyProps, ...props }} />
        }
      </Promisify>
    )
}
