import React, { Component } from 'react'
import { Row, Col, Tabs, Icon } from 'antd'
import { connect } from 'react-redux'

import GroupProfile from './GroupProfile'
import GroupAchievements from './achievementTab'
import GroupMember from './memberTab'
import Setting from './settingTab'
import Spinner from '../../components/spinner'
import client from '../../client'
import { setCurrentGroup } from '../../actions/groupActions'

const { TabPane } = Tabs

const styles = {
  container: {
    height: '100%',
  },
  banner: {
    background: 'linear-gradient(50deg, #115192 50%, #1C3665 1%)',
    height: '200px',
    paddingTop: '64px',
  },
  groupName: {
    fontSize: '1.75em',
    color: '#fff',
  },
  tabIcons: {
    fontSize: 32,
  },
  tabpane: {
    display: 'flex',
    justifyContent: 'space-around',
  },
}

class GroupPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      members: [],
      isAdmin: false,
    }
    this.callback = this.callback.bind(this)
  }

  componentWillMount() {
    this.fetchGroup()
  }

  async fetchGroup() {
    const {userId} = this.props
    const groupsService = await client.service('api/groups')
    const userService = await client.service('users')

    try {
      const result = await groupsService.get('5ae02e6ad2d7732424e79945')
      if (result) {
        this.props.setGroup(result)
      }
      result.admins.forEach(admin => {
        if(admin===userId){
          this.setState({isAdmin:true})
        }
      })
      this.state.members = await userService.find({query:{_id:{$in:result.members}}})
      this.setState({members:this.state.members.data})
    } catch (error) {
      console.log(error)
    }
  }

  callback(key) {
    console.log(key)
  }

  render() {
    const { group } = this.props
    if (!group) {
      return <Spinner />
    }
    const groupName = group.name.toUpperCase()
    return (
      <div style={styles.container}>
        <Row
          style={styles.banner}
          type="flex"
          justify="center"
          align="middle"
        >
          <Col>
            <span style={styles.groupName}>{group.name}</span>
          </Col>
        </Row>
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab={<Icon type="idcard" style={styles.tabIcons} />} key="1"><GroupProfile group={group} /></TabPane>
          <TabPane tab={<Icon type="trophy" style={styles.tabIcons} />} key="2"><GroupAchievements achievements={group.achievements} /></TabPane>
          <TabPane tab={<Icon type="contacts" style={styles.tabIcons} />} key="3"><GroupMember members={this.state.members} /></TabPane>
          {this.state.isAdmin && <TabPane tab={<Icon type="setting" style={styles.tabIcons} />} key="4"><Setting group={group}/></TabPane>}
        </Tabs>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  group: state.group.currentGroup,
  userId: state.user.user._id,
})

const mapDispatchToProps = dispatch => ({
  setGroup: (group) => {
    dispatch(setCurrentGroup(group))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage)
