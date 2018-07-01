import React from 'react'
import { Menu, Dropdown, Icon, Badge, Avatar } from 'antd'

const styles = {
  name: {
    fontSize: '18px',
    padding: '5px',
    marginRight: '5px',
    color: '#fff',
  },
  navLink: {
    color: 'white',
    cursor: 'pointer',
    textDecoration: 'none',
  },
}

const Profile = ({ user, logout }) => {
  if (!user) return null

  const menu = (
    <Menu>
      <Menu.Item key="1"><a href="/#/profile">Profile</a></Menu.Item>
      {/* <Menu.Item key="4"><a href="/#/create-group">Group</a></Menu.Item> */}
      <Menu.Item key="3"><a onClick={logout} href="/#/">Logout</a></Menu.Item>
    </Menu>
  )

  return (
    <div style={{ marginRight: '8px' }} className="header-profile" >
      <span style={styles.name} className="hide-on-mobile">
        <a style={styles.navLink} href="/#/profile">{user.firstname}</a>
      </span>
      <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
        <span style={styles.navLink} className="show-on-mobile" >{user.firstname} </span>
      </Dropdown>
      <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
        <Icon type="caret-down" style={styles.navLink} />
      </Dropdown>
    </div >
  )
}

export default Profile
