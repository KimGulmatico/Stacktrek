import React from 'react'
import { Layout, Card, Icon } from 'antd'

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  center: {
    alignContent: 'center',
    alignItems: 'center',
    fontSize: '40px'
  }
}

const Achievement = ({achievements}) => {
  let list = achievements.map(achievement => (
    <Card
    title={<div><Icon type="trophy" style={styles.tabIcons} />{achievement.name}</div>}
    style={{width:'100%'}}
    >
      {achievement.date}
    </Card> 
  ))
  return (
    <Layout style={styles.container}>
        <div style={styles.center}>
          ACHIEVEMENTS
        </div>
        {list}
    </Layout>
  )
}

export default Achievement
