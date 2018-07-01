import React from 'react'

const styles = {
  nav: {
    width: '200px',
    display: 'flex',
    justifyContent: 'space-around',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
  },
}

const Nav = () => (
  <div>
    <div className="hide-on-mobile">
      <div style={styles.nav}>
        <a href="/#" style={styles.navLink}> HOME </a>
        <a href="/#/events" style={styles.navLink}> EVENTS </a>
      </div>
    </div>
    <div className="show-on-mobile">
      <a href="/#" style={styles.navLink}> HOME </a>
      <a href="/#/events" style={styles.navLink}> EVENTS </a>
    </div>
  </div>
)

export default Nav
