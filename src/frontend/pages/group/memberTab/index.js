import React, { Component } from 'react'
import { Layout } from 'antd'
import MemberInfo from './memberInfo'

const styles = {
  container: {
    width: '100%',
    padding: '16px',
  },
}


class GroupMember extends Component {
  constructor(props) {
    super(props)
    this.state = {
      members: props.members
    }
  }

  render() {
    let members = []
    this.state.members.forEach(member => {
      members.push(<MemberInfo member={member} />)
    });

    return (
      <Layout
        type="flex"
        align="middle"
        justify="center"
        style={styles.container}
      >
        {members}
      </Layout>
    )
  }
}

export default GroupMember
