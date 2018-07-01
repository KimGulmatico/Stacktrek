import React, { Component } from 'react'
import { Layout } from 'antd'
import Counter from './BadgeCounter'

class Achievement extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <Layout
        type="flex"
        align="middle"
        justify="center"
        className="container"
      >
        <Counter />
      </Layout>
    )
  }
}

export default Achievement
