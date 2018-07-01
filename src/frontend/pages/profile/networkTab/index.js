import React, { Component } from 'react'
import { Layout } from 'antd'
import ProfileCard from './ProfileCard'
import GroupsCard from './Groups'
import TitleCard from './TitleCard'

class Network extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    const profiles = []
    for (let i = 0; i < 10; i += 1) {
      profiles.push(<ProfileCard
        key={i}
        name="Tristan Karlo Macadangdang"
        title="Software Engineer"
      />)
    }

    return (
      <Layout
        type="flex"
        align="middle"
        justify="center"
        className="network-container"
      >
        <GroupsCard groups={[1, 2, 3, 4, 5, 6]} />
        <TitleCard />
        {profiles}
      </Layout>
    )
  }
}

export default Network
