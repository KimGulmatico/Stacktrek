import React, { Component } from 'react'
import GroupAvatar from './GroupAvatar'

class GroupsCard extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {

  }
  render() {
    const { groups } = this.props
    let list = []
    if (groups.length > 3) {
      list = groups.slice(0, 3)
    } else {
      list = groups
    }
    list = list.map(index => (<GroupAvatar key={index} />))
    return (
      <div className="holder">
        <div className="details">
          <div className="title">Groups</div>
          <div className="subtitle">Obed is a member of these groups.</div>
          <div className="groups">
            {list}
          </div>
        </div>
        <div className="menu">
          <span>Show more</span>
        </div>
      </div>
    )
  }
}

export default GroupsCard
